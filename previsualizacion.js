document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Recuperar información del cliente desde sessionStorage
    document.getElementById("nombreCliente").textContent = sessionStorage.getItem("nombreCliente") || "N/A";
    document.getElementById("direccionCliente").textContent = sessionStorage.getItem("direccionCliente") || "N/A";
    document.getElementById("nitCliente").textContent = sessionStorage.getItem("nitCliente") || "N/A";
    document.getElementById("telefonoCliente").textContent = sessionStorage.getItem("telefonoCliente") || "N/A";

    // 🔹 Recuperar los productos cotizados correctamente
    const cotizacionJSON = sessionStorage.getItem("cotizacionProductos");
    const cotizacion = cotizacionJSON ? JSON.parse(cotizacionJSON) : [];

    const tablaProductos = document.getElementById("listaProductosCotizados");
    let totalCotizacion = 0;

    if (cotizacion.length > 0) {
        cotizacion.forEach(producto => {
            const precioUnitario = parseFloat(producto.precioUnitario); // Precio por unidad correcto
            const cantidad = parseInt(producto.cantidad); // Cantidad seleccionada
            const totalProducto = precioUnitario * cantidad; // Precio total correcto

            totalCotizacion += totalProducto; // Sumar al total de la cotización

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
        console.warn("No hay productos en sessionStorage. Verifica `app.js`.");
        tablaProductos.innerHTML = "<tr><td colspan='4'>No hay productos en la cotización.</td></tr>";
    }

    // 🔹 Posicionar correctamente el total de la cotización
    const filaTotal = document.createElement("tr");
    filaTotal.innerHTML = `
        <td colspan="3"><strong>Total de la Cotización:</strong></td>
        <td><strong>Q${totalCotizacion.toFixed(2)}</strong></td>
    `;
    tablaProductos.appendChild(filaTotal);
});
