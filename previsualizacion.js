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

    // ⚠️ Solución: Vaciar la tabla antes de agregar productos para evitar duplicaciones
    tablaProductos.innerHTML = ""; 

    let totalCotizacion = 0;

    if (cotizacion.length > 0) {
        cotizacion.forEach(producto => {
            const precioUnitario = parseFloat(producto.precioUnitario);
            const cantidad = parseInt(producto.cantidad);

            if (isNaN(precioUnitario) || isNaN(cantidad)) {
                console.error("Error en los datos del producto:", producto);
                return;
            }

            const totalProducto = precioUnitario * cantidad;
            totalCotizacion += totalProducto;

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.descripcion}</td>
                <td>${cantidad}</td>
                <td>Q${precioUnitario.toFixed(2)}</td>
                <td>Q${totalProducto.toFixed(2)}</td>
            `;
            tablaProductos.appendChild(fila);
        });
    }

    // Ajustar el total correctamente
    document.getElementById("totalCotizacion").textContent = totalCotizacion.toFixed(2);
});

// Evento del botón "Volver al inicio"
document.getElementById('volverInicio').addEventListener('click', function () {
    window.location.href = 'index.html';
});

// Evento del botón "Descargar Cotización"
document.getElementById('descargarImagen').addEventListener('click', function () {
    const cotizacion = document.getElementById('cotizacionCaptura'); // SOLO captura el contenido correcto
    
    // ⚠️ Solución: Evitar múltiples clics en el botón de descarga
    const botonDescargar = document.getElementById('descargarImagen');
    botonDescargar.disabled = true;

    html2canvas(cotizacion, { scale: 2 }).then(canvas => { 
        const enlace = document.createElement('a');
        enlace.href = canvas.toDataURL("image/png");
        enlace.download = "cotizacion.png";
        enlace.click();

        // Reactivar el botón después de unos segundos
        setTimeout(() => {
            botonDescargar.disabled = false;
        }, 2000);
    });
});
