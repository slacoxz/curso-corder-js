// Variables globales
let productos = []; // Variable global para almacenar los productos

// Función para cargar productos desde un JSON
async function cargarProductos() {
    try {
        const response = await fetch('./archivos.json/productos.json'); 
        if (!response.ok) throw new Error('Error al cargar los productos');
        
        productos = await response.json(); // Asignar los productos a la variable global
        mostrarProductos(productos); // Mostrar los productos en la página
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Mostrar productos en la página principal (index.html)
function mostrarProductos(productos) {
    const productList = document.getElementById('product-list');
    if (!productList) {
        console.error('No se encontró el contenedor de la lista de productos');
        return;
    }
    productList.innerHTML = ''; // Limpiar productos anteriores

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}$</p>
            <button class="btn-agregar" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-imagen="${producto.imagen}">
                Agregar al Carrito
            </button>
        `;
        productList.appendChild(div);
    });

    // Añadir funcionalidad a los botones de "Agregar al carrito"
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
    const { id: idProducto, nombre: nombreProducto, precio: precioProducto, imagen: imagenProducto } = event.target.dataset;

    if (!idProducto || !nombreProducto || !precioProducto || !imagenProducto) {
        console.error("Faltan datos del producto. No se puede agregar al carrito.");
        return; // No agregar al carrito si falta información
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoEncontrado = carrito.find(item => item.id === idProducto);

    if (productoEncontrado) {
        productoEncontrado.cantidad += 1; // Si el producto ya está en el carrito, aumentar cantidad
    } else {
        carrito.push({
            id: idProducto,
            nombre: nombreProducto,
            precio: parseFloat(precioProducto), // Convertir precio a número
            imagen: imagenProducto,
            cantidad: 1
        }); // Si no está, añadir al carrito
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    actualizarNumeroCarrito();  // Actualizar el número de productos en el carrito
    mostrarNotificacion(); // Mostrar animación en vez de alert
}

// Función para mostrar notificación en vez de alert
function mostrarNotificacion() {
    const notificacion = document.createElement('div');
    notificacion.classList.add('notificacion');
    notificacion.textContent = 'Producto añadido a tu carrito!';
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove(); // Remover notificación después de 2 segundos
    }, 2000);
}

// Actualizar el número de productos en el ícono del carrito
function actualizarNumeroCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const numeroCarrito = document.getElementById('numero-carrito'); // Asegúrate de tener este elemento en el HTML.
    if (numeroCarrito) {
        numeroCarrito.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0); // Muestra la cantidad total de productos en el carrito
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos(); // Cargar productos al inicio
    actualizarNumeroCarrito(); // Llamarlo al cargar la página
});
