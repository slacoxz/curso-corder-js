// Función para cargar productos desde un JSON
async function cargarProductos() {
    try {
        const response = await fetch('./archivos.json/productos.json'); // Cargar archivo JSON de productos
        if (!response.ok) throw new Error('Error al cargar los productos');
        
        const productos = await response.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Mostrar productos en la página principal
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
    const idProducto = event.target.dataset.id;
    const nombreProducto = event.target.dataset.nombre;
    const precioProducto = event.target.dataset.precio;
    const imagenProducto = event.target.dataset.imagen;

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
            precio: precioProducto,
            imagen: imagenProducto,
            cantidad: 1
        }); // Si no está, añadir al carrito
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    mostrarNotificacion(); // Mostrar animación en vez de alert
    mostrarCarrito(); // Actualizar la vista del carrito
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

// Función para mostrar los productos del carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoDiv = document.getElementById('carrito');
    const vaciarBtn = document.getElementById('vaciar-carrito');
    carritoDiv.innerHTML = '';
    if (carrito.length === 0) {
        carritoDiv.innerHTML = '<p>No hay productos en el carrito</p>';
        vaciarBtn.style.display = 'none'; // Ocultar el botón si no hay productos
        return;
    }
    vaciarBtn.style.display = 'block'; // Mostrar el botón si hay productos
    if (!carritoDiv) {
        console.error('No se encontró el contenedor del carrito');
        return;
    }
    carritoDiv.innerHTML = ''; // Limpiar vista del carrito

    if (carrito.length === 0) {
        carritoDiv.innerHTML = '<p>No hay productos en el carrito</p>';
        return;
    }

    carrito.forEach(item => {
        
        if (!item.nombre || !item.precio || !item.imagen || !item.id) {
            console.error("Producto inválido encontrado en el carrito.");
            return;
        }
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('carrito-item');
        productoDiv.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <p>${item.nombre} - ${item.precio} $ - Cantidad: ${item.cantidad}</p>
            <button onclick="eliminarProducto('${item.id}')">Eliminar</button>
        `;
        carritoDiv.appendChild(productoDiv);
    });
}

// Función para eliminar un producto específico del carrito
function eliminarProducto(idProducto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    carrito = carrito.filter(item => item.id !== idProducto); // Filtrar productos para eliminar el seleccionado

    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar nuevo carrito
    mostrarCarrito(); // Actualizar la vista del carrito
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito'); // Eliminar el carrito del localStorage
    mostrarCarrito(); // Actualizar la vista
}

// Función para ordenar productos (según la lógica que prefieras)
function ordenarProductos() {
    const criterio = document.getElementById('ordenar').value;
    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    if (criterio === 'precio-asc') {
        productos.sort((a, b) => a.precio - b.precio);
    } else if (criterio === 'precio-desc') {
        productos.sort((a, b) => b.precio - a.precio);
    }

    mostrarProductos(productos); // Volver a mostrar productos con el nuevo orden
}

// Cargar productos cuando se inicia la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos(); // Cargar productos al inicio
    const ordenarSelect = document.getElementById('ordenar');
    if (ordenarSelect) {
        ordenarSelect.addEventListener('change', ordenarProductos); // Añadir funcionalidad de ordenar
    }
    mostrarCarrito(); // Mostrar productos en el carrito si los hay

    const botonVaciar = document.getElementById('vaciar-carrito');
    if (botonVaciar) {
        botonVaciar.addEventListener('click', vaciarCarrito);
    }
});
