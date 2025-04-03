document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Recuperar información del cliente desde sessionStorage
    document.getElementById("nombreCliente").textContent = sessionStorage.getItem("nombreCliente") || "N/A";
    document.getElementById("direccionCliente").textContent = sessionStorage.getItem("direccionCliente") || "N/A";
    document.getElementById("nitCliente").textContent = sessionStorage.getItem("nitCliente") || "N/A";
    document.getElementById("telefonoCliente").textContent = sessionStorage.getItem("telefonoCliente") || "N/A";

    // 🔹 Recuperar los productos cotizados y mostrarlos correctamente en la tabla
    const cotizacion = sessionStorage.getItem("cotizacionProductos") ? JSON.parse(sessionStorage.getItem("cotizacionProductos")) : [];
    const tablaProductos = document.getElementById("listaProductosCotizados");
    let totalCotizacion = 0;

    if (cotizacion.length > 0) {
        cotizacion.forEach(producto => {
            const totalProducto = parseFloat(producto.precioUnitario) * parseInt(producto.cantidad);
            totalCotizacion += totalProducto;

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.descripcion}</td>
                <td>${producto.cantidad}</td>
                <td>Q${parseFloat(producto.precioUnitario).toFixed(2)}</td>
                <td>Q${totalProducto.toFixed(2)}</td>
            `;
            tablaProductos.appendChild(fila);
        });
    } else {
        tablaProductos.innerHTML = "<tr><td colspan='4'>No hay productos en la cotización.</td></tr>";
    }

    document.getElementById("totalCotizacion").textContent = `Q${totalCotizacion.toFixed(2)}`;
});

// 🔹 Función para descargar la cotización como imagen
document.getElementById('descargarImagen').addEventListener('click', function () {
    const cotizacion = document.getElementById('cotizacionPreview');

    html2canvas(cotizacion).then(canvas => {
        const enlace = document.createElement('a');
        enlace.href = canvas.toDataURL("image/png");
        enlace.download = "cotizacion.png";
        enlace.click();
    });
});

// 🔹 Botón para volver al inicio (Solo una vez)
document.getElementById('volverInicio').addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirige a la página principal
});

// 🔹 Botón para volver al inicio (Solo una vez)
document.getElementById('volverInicio').addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirige a la página principal
});
