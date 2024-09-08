// Función para validar que un valor no esté vacío y siga una expresión regular
function validarEntrada(mensaje, regex, errorMensaje) {
    let entrada;
    do {
        entrada = prompt(mensaje);
        if (entrada === null || entrada.trim() === "" || !regex.test(entrada)) {
            alert(errorMensaje);
        }
    } while (entrada === null || entrada.trim() === "" || !regex.test(entrada));
    return entrada.trim();
}

// Validaciones específicas para nombre, apellido, email y teléfono
function capturarDatosPersonales() {
    // Validar que el nombre solo contenga letras y empiece con mayúscula
    let nombre = validarEntrada(
        "Ingrese su nombre (solo letras, empieza con mayúscula):",
        /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/,
        "El nombre solo debe contener letras y cada palabra debe comenzar con mayúscula. Inténtelo de nuevo."
    );

    // Validar que el apellido solo contenga letras y empiece con mayúscula
    let apellido = validarEntrada(
        "Ingrese su apellido (solo letras, empieza con mayúscula):",
        /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/,
        "El apellido solo debe contener letras y cada palabra debe comenzar con mayúscula. Inténtelo de nuevo."
    );

    // Validación para correo electrónico
    let email = validarEntrada(
        "Ingrese su correo electrónico:",
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Debe ingresar un correo electrónico válido. Inténtelo de nuevo."
    );

    // Validar número de teléfono (10 dígitos, opcionalmente con guiones o espacios)
    let telefono = validarEntrada(
        "Ingrese su número de teléfono (solo números, 10 dígitos):",
        /^\d{10}$/,
        "Debe ingresar un número de teléfono válido de 10 dígitos. Inténtelo de nuevo."
    );

    return {
        nombre: nombre,
        apellido: apellido,
        email: email,
        telefono: telefono
    };
}

// Función para validar que un valor sea un número positivo
function validarNumero(mensaje) {
    let numero;
    do {
        numero = prompt(mensaje);
        if (isNaN(numero) || numero === null || numero.trim() === "" || parseFloat(numero) <= 0) {
            alert("Debe ingresar un número válido mayor a 0. Inténtelo de nuevo.");
        }
    } while (isNaN(numero) || numero === null || numero.trim() === "" || parseFloat(numero) <= 0);
    return parseFloat(numero);
}

// Productos predefinidos en la tienda
const productosTienda = [
    { codigo: "P001", nombre: "Collar Elegante", precio: 1500 },
    { codigo: "P002", nombre: "Pulsera Brillante", precio: 800 },
    { codigo: "P003", nombre: "Anillo de Plata", precio: 1200 },
    { codigo: "P004", nombre: "Aros Dorados", precio: 500 }
];

// Función para mostrar los productos disponibles y seleccionar uno
function seleccionarProducto() {
    let mensaje = "Seleccione un producto ingresando su código:\n";
    productosTienda.forEach(producto => {
        mensaje += `${producto.codigo} - ${producto.nombre} ($${producto.precio})\n`;
    });

    let codigoProducto;
    let productoSeleccionado;

    do {
        codigoProducto = validarEntrada(
            mensaje,
            /^[A-Z0-9]{4}$/,
            "Debe ingresar un código de producto válido (ej: P001)."
        );
        productoSeleccionado = productosTienda.find(producto => producto.codigo === codigoProducto);

        if (!productoSeleccionado) {
            alert("Código de producto inválido. Inténtelo de nuevo.");
        }
    } while (!productoSeleccionado);

    return productoSeleccionado;
}

// Función para calcular el total sin descuentos
function calcularTotalSinDescuento(carrito) {
    let total = 0;
    carrito.forEach(item => {
        total += item.cantidad * item.producto.precio;
    });
    return total;
}

// Función para aplicar un descuento
function aplicarDescuento(total, descuento) {
    return total - (total * (descuento / 100));
}

// Función para calcular el IVA
function calcularIVA(total) {
    const iva = 21; // IVA del 21%
    return total * (iva / 100);
}

// Función para mostrar los datos del usuario en la consola
function mostrarDatosUsuario(usuario) {
    console.log(`Datos del usuario:`);
    console.log(`Nombre: ${usuario.nombre}`);
    console.log(`Apellido: ${usuario.apellido}`);
    console.log(`Email: ${usuario.email}`);
    console.log(`Teléfono: ${usuario.telefono}`);
}

// Función principal del simulador
function simuladorCompra() {
    // Capturar los datos personales del usuario
    let usuario = capturarDatosPersonales();
    mostrarDatosUsuario(usuario); // Mostrar los datos en la consola

    // Capturar productos en el carrito
    let carrito = [];
    let cantidadProductos = validarNumero("¿Cuántos productos desea agregar al carrito?");

    // Capturamos los productos ingresados
    for (let i = 0; i < cantidadProductos; i++) {
        let producto = seleccionarProducto();
        let cantidad = validarNumero(`Ingrese la cantidad de ${producto.nombre} que desea comprar:`);
        carrito.push({ producto: producto, cantidad: cantidad });
    }

    // Calculamos el total sin descuento ni IVA
    let totalSinDescuento = calcularTotalSinDescuento(carrito);
    console.log("Total sin descuento: $" + totalSinDescuento);

    // Aplicar un descuento si es necesario
    let aplicarDescuentoUsuario = prompt("¿Desea aplicar un descuento? (si/no)").toLowerCase();
    let totalConDescuento = totalSinDescuento;

    if (aplicarDescuentoUsuario === "si") {
        let descuento = validarNumero("Ingrese el porcentaje de descuento:");
        totalConDescuento = aplicarDescuento(totalSinDescuento, descuento);
        console.log(`Se ha aplicado un descuento del ${descuento}%. Total con descuento: $${totalConDescuento}`);
    }

    // Calculamos el IVA
    let iva = calcularIVA(totalConDescuento);
    let totalConIVA = totalConDescuento + iva;

    // Mostrar resultados finales al usuario
    console.log("IVA (21%): $" + iva);
    console.log("Total con IVA: $" + totalConIVA);

    alert(`Total de la compra con IVA incluido: $${totalConIVA}`);
}

// Ejecutar el simulador
simuladorCompra();
