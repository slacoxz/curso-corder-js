// Función para mostrar los productos del carrito y calcular el total
function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    if (!carritoDiv) {
        console.error('No se encontró el contenedor del carrito');
        return; // Salir de la función si no se encuentra el contenedor
    }

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoDiv.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        carritoDiv.innerHTML = '<p>No hay productos en el carrito</p>';
        return; // Salir de la función si el carrito está vacío
    }

    carrito.forEach(item => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('carrito-item');
        productoDiv.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <p>${item.nombre} - ${item.precio} $ - Cantidad: ${item.cantidad}</p>
            <button onclick="eliminarProducto('${item.id}')">Eliminar</button>
        `;
        carritoDiv.appendChild(productoDiv);
        total += item.precio * item.cantidad;
    });

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total-carrito');
    totalDiv.innerHTML = `<h3>Total: ${total} $</h3>`;
    carritoDiv.appendChild(totalDiv);

    // Agregar botones de "Vaciar Carrito" y "Finalizar Compra"
    const accionesDiv = document.createElement('div');
    accionesDiv.classList.add('acciones-carrito');
    accionesDiv.innerHTML = `
        <button id="vaciar-carrito" class="btn-vaciar">Vaciar Carrito</button>
        <button id="finalizar-compra" class="btn-finalizar">Finalizar Compra</button>
    `;
    carritoDiv.appendChild(accionesDiv);

    // Añadir eventos a los botones
    document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
    document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);
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

// Función para finalizar la compra
function finalizarCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert('No tienes productos en el carrito.');
        return;
    }
    
    // Aquí puedes manejar el proceso de pago o redirigir a una página de confirmación
    alert('Gracias por tu compra!');

    // Vaciar el carrito después de la compra
    localStorage.removeItem('carrito');
    mostrarCarrito();
    actualizarNumeroCarrito();
}

// Actualizar el número de productos en el ícono del carrito (opcional)
function actualizarNumeroCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const numeroCarrito = document.getElementById('numero-carrito'); // Asegúrate de tener este elemento en el HTML.
    if (numeroCarrito) {
        numeroCarrito.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0); // Muestra la cantidad total de productos en el carrito
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito(); // Mostrar productos del carrito al cargar la página
    actualizarNumeroCarrito(); // Actualizar el número de productos en el carrito

    // Eventos para vaciar carrito y finalizar compra
    const botonVaciar = document.getElementById('vaciar-carrito');
    const botonFinalizar = document.getElementById('finalizar-compra');

    if (botonVaciar) {
        botonVaciar.addEventListener('click', vaciarCarrito);
    }

    if (botonFinalizar) {
        botonFinalizar.addEventListener('click', finalizarCompra);
    }
});
