document.addEventListener("DOMContentLoaded", function() {
    // Productos predefinidos en la tienda
    const productosTienda = [
        { codigo: "P001", nombre: "Collar Elegante", precio: 1500 },
        { codigo: "P002", nombre: "Pulsera Brillante", precio: 800 },
        { codigo: "P003", nombre: "Anillo de Plata", precio: 1200 },
        { codigo: "P004", nombre: "Aros Dorados", precio: 500 }
    ];

    let usuario = {};
    let carrito = [];

    function mostrarProductos() {
        const productosContainer = document.getElementById("productos-container");
        productosContainer.innerHTML = "<h3>Seleccione un producto para agregar al carrito:</h3>";
        productosTienda.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.innerHTML = `
                <p>${producto.codigo} - ${producto.nombre}: $${producto.precio}</p>
                <input type="number" id="cantidad-${producto.codigo}" placeholder="Cantidad">
                <button onclick="agregarAlCarrito('${producto.codigo}')">Agregar al Carrito</button>
            `;
            productosContainer.appendChild(productoDiv);
        });
    }

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

    function guardarEnStorage(clave, valor) {
        localStorage.setItem(clave, JSON.stringify(valor));
    }

    function cargarDatos() {
        const datosUsuario = localStorage.getItem("usuario");
        const datosCarrito = localStorage.getItem("carrito");

        if (datosUsuario) {
            usuario = JSON.parse(datosUsuario);
            mostrarDatosUsuario(usuario);
        }

        if (datosCarrito) {
            carrito = JSON.parse(datosCarrito);
            mostrarCarrito(carrito);
        }
    }

    function mostrarCarrito(carrito) {
        const carritoDiv = document.getElementById("carrito");
        if (carritoDiv) {
            carritoDiv.innerHTML = ""; // Limpiar antes de agregar nuevos elementos
            carrito.forEach(item => {
                carritoDiv.innerHTML += `<p>${item.producto.nombre} x${item.cantidad} - $${item.producto.precio * item.cantidad}</p>`;
            });
        }
    }

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

    // Inicialización
    cargarDatos();
    mostrarProductos();
});
