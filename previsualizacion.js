document.addEventListener("DOMContentLoaded", function () {
    // Recuperar información del cliente desde `sessionStorage`
    document.getElementById("nombreCliente").textContent = sessionStorage.getItem("nombreCliente") || "N/A";
    document.getElementById("direccionCliente").textContent = sessionStorage.getItem("direccionCliente") || "N/A";
    document.getElementById("nitCliente").textContent = sessionStorage.getItem("nitCliente") || "N/A";
    document.getElementById("telefonoCliente").textContent = sessionStorage.getItem("telefonoCliente") || "N/A";

    // Recuperar los productos cotizados
    const cotizacionJSON = sessionStorage.getItem("cotizacionProductos");
    const cotizacion = cotizacionJSON ? JSON.parse(cotizacionJSON) : [];

    const tablaProductos = document.getElementById("listaProductosCotizados");
    let totalCotizacion = 0;

    if (cotizacion.length > 0) {
        cotizacion.forEach(producto => {
            // Convertir valores a números antes de procesarlos
            const precioUnitario = parseFloat(producto.precioUnitario);
            const cantidad = parseInt(producto.cantidad);

            // Verificar que los datos sean correctos
            if (isNaN(precioUnitario) || isNaN(cantidad)) {
                console.error("Error en los datos del producto:", producto);
                return;
            }

            // Calcular precio total correctamente
            const totalProducto = precioUnitario * cantidad;
            totalCotizacion += totalProducto;

            // Crear la fila de la tabla con los datos corregidos
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.descripcion}</td>
                <td>${cantidad}</td>
                <td>Q${precioUnitario.toFixed(2)}</td>
                <td>Q${totalProducto.toFixed(2)}</td>
            `;
            tablaProductos.appendChild(fila);
        });
    } else {
        tablaProductos.innerHTML = "<tr><td colspan='4'>No hay productos en la cotización.</td></tr>";
    }

    // Agregar la fila del total de la cotización
    const filaTotal = document.createElement("tr");
    filaTotal.innerHTML = `
        <td colspan="3"><strong>Total de la Cotización:</strong></td>
        <td><strong>Q${totalCotizacion.toFixed(2)}</strong></td>
    `;
    tablaProductos.appendChild(filaTotal);
});

// Evento del botón "Volver al inicio"
document.getElementById('volverInicio').addEventListener('click', function () {
    window.location.href = 'index.html';
});

// Evento del botón "Descargar Cotización"
document.getElementById('descargarImagen').addEventListener('click', function () {
    const cotizacion = document.getElementById('cotizacionPreview'); // Solo la cotización

    html2canvas(cotizacion).then(canvas => {
        const enlace = document.createElement('a');
        enlace.href = canvas.toDataURL("image/png");
        enlace.download = "cotizacion.png";
        enlace.click();
    });
});
