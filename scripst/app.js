// Productos predefinidos en la tienda
const productosTienda = [
    { codigo: "P001", nombre: "Collar Elegante", precio: 1500 },
    { codigo: "P002", nombre: "Pulsera Brillante", precio: 800 },
    { codigo: "P003", nombre: "Anillo de Plata", precio: 1200 },
    { codigo: "P004", nombre: "Aros Dorados", precio: 500 }
];

// Inicializar datos del usuario y carrito
let usuario = {};
let carrito = [];

// Cargar productos en el DOM
function mostrarProductos() {
    const productosContainer = document.getElementById("productos-container");
    productosContainer.innerHTML = "<h3>Seleccione un producto para agregar al carrito:</h3>";
    
    productosTienda.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
            <p>${producto.codigo} - ${producto.nombre}: $${producto.precio}</p>
            <input type="number" id="cantidad-${producto.codigo}" placeholder="Cantidad" min="1">
            <button onclick="agregarAlCarrito('${producto.codigo}')">Agregar al Carrito</button>
        `;
        productosContainer.appendChild(productoDiv);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(codigoProducto) {
    const producto = productosTienda.find(p => p.codigo === codigoProducto);
    const cantidad = parseInt(document.getElementById(`cantidad-${codigoProducto}`).value);

    if (cantidad > 0) {
        carrito.push({ producto, cantidad });
        guardarEnStorage("carrito", carrito);
        alert(`Agregado ${producto.nombre} x${cantidad} al carrito`);
        mostrarCarrito();  // Actualizar el carrito en la página
    } else {
        alert("Debe ingresar una cantidad válida.");
    }
}

// Mostrar carrito en el DOM
function mostrarCarrito() {
    const carritoContainer = document.getElementById("carrito-container");
    carritoContainer.innerHTML = "";  // Limpiar el contenedor antes de renderizar

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    carrito.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `
            <p>${item.producto.nombre} - Cantidad: ${item.cantidad} - Precio Total: $${item.cantidad * item.producto.precio}</p>
        `;
        carritoContainer.appendChild(itemDiv);
    });
}

// Capturar datos del usuario y almacenarlos en el storage
document.getElementById("form-datos-personales").addEventListener("submit", function (e) {
    e.preventDefault();

    usuario = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value
    };

    guardarEnStorage("usuario", usuario);
    alert("Datos personales guardados correctamente.");
    mostrarDatosUsuario(usuario);  // Mostrar los datos del usuario en la página
});

// Guardar datos en LocalStorage
function guardarEnStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

// Cargar datos del storage
function cargarDatos() {
    const datosUsuario = localStorage.getItem("usuario");
    const datosCarrito = localStorage.getItem("carrito");

    if (datosUsuario) {
        usuario = JSON.parse(datosUsuario);
        mostrarDatosUsuario(usuario);
    }

    if (datosCarrito) {
        carrito = JSON.parse(datosCarrito);
        mostrarCarrito();  // Mostrar los productos almacenados en el carrito
    }
}

// Mostrar datos del usuario en la página
function mostrarDatosUsuario(usuario) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <h3>Datos del Usuario</h3>
        <p>Nombre: ${usuario.nombre}</p>
        <p>Apellido: ${usuario.apellido}</p>
        <p>Email: ${usuario.email}</p>
        <p>Teléfono: ${usuario.telefono}</p>
    `;
}

// Cargar datos al iniciar la página
cargarDatos();
mostrarProductos();
