// Cuando la página se carga, recuperar datos de sessionStorage
document.addEventListener("DOMContentLoaded", function () {
    const cotizacion = sessionStorage.getItem("cotizacionProductos");

    if (cotizacion) {
        document.getElementById("listaProductosCotizados").innerHTML = cotizacion;
    } else {
        document.getElementById("listaProductosCotizados").innerHTML = "<tr><td colspan='4'>No hay productos en la cotización.</td></tr>";
    }

    // Cargar la información del cliente desde sessionStorage
    document.getElementById("nombreCliente").textContent = sessionStorage.getItem("nombreCliente") || "N/A";
    document.getElementById("direccionCliente").textContent = sessionStorage.getItem("direccionCliente") || "N/A";
    document.getElementById("nitCliente").textContent = sessionStorage.getItem("nitCliente") || "N/A";
    document.getElementById("telefonoCliente").textContent = sessionStorage.getItem("telefonoCliente") || "N/A";

    // Obtener la fecha actual
    const fechaActual = new Date().toLocaleDateString();
    document.getElementById("fechaCotizacion").textContent = fechaActual;

    // Calcular el total de la cotización
    let total = 0;
    document.querySelectorAll("#listaProductosCotizados tr").forEach(row => {
        const precioTotalElement = row.querySelector(".precioTotal");
        if (precioTotalElement) {
            const precioTotal = parseFloat(precioTotalElement.textContent.replace("Q", ""));
            total += precioTotal;
        }
    });

    document.getElementById("totalCotizacion").textContent = total.toFixed(2);
});

// Función para descargar la cotización como imagen
document.getElementById('descargarImagen').addEventListener('click', function () {
    const cotizacion = document.getElementById('cotizacionPreview');

    html2canvas(cotizacion).then(canvas => {
        const enlace = document.createElement('a');
        enlace.href = canvas.toDataURL("image/png");
        enlace.download = "cotizacion.png";
        enlace.click();
    });
});

// Botón para volver al inicio
document.getElementById('volverInicio').addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirige a la página principal
});
