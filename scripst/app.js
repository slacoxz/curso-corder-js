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

        // Crear el botón
        const addButton = document.createElement("button");
        addButton.textContent = "Agregar al Carrito";

        // Añadir el evento click al botón
        addButton.addEventListener('click', () => agregarAlCarrito(producto.codigo));

        // Crear el HTML del producto y agregar el botón
        productoDiv.innerHTML = `
            <p>${producto.codigo} - ${producto.nombre}: $${producto.precio}</p>
            <input type="number" id="cantidad-${producto.codigo}" placeholder="Cantidad">
        `;
        productoDiv.appendChild(addButton);
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
    } else {
        alert("Debe ingresar una cantidad válida.");
    }
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
        mostrarCarrito();
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

// Mostrar carrito de compras
function mostrarCarrito() {
    const carritoDiv = document.getElementById("carrito-container");

    if (carritoDiv) {
        carritoDiv.innerHTML = "<h3>Carrito de Compras</h3>";
        carrito.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.innerHTML = `
                <p>${item.producto.nombre} x${item.cantidad} - $${item.producto.precio * item.cantidad}</p>
            `;
            carritoDiv.appendChild(itemDiv);
        });
    }
}

// Cargar datos al iniciar la página
cargarDatos();
mostrarProductos();