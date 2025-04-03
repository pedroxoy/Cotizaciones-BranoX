document.addEventListener("DOMContentLoaded", function () {
    // **Recuperar información del cliente desde `sessionStorage`**
    document.getElementById("nombreCliente").textContent = sessionStorage.getItem("nombreCliente") || "N/A";
    document.getElementById("direccionCliente").textContent = sessionStorage.getItem("direccionCliente") || "N/A";
    document.getElementById("nitCliente").textContent = sessionStorage.getItem("nitCliente") || "N/A";
    document.getElementById("telefonoCliente").textContent = sessionStorage.getItem("telefonoCliente") || "N/A";

    // **Recuperar los productos cotizados correctamente**
    const cotizacionJSON = sessionStorage.getItem("cotizacionProductos");
    const cotizacion = cotizacionJSON ? JSON.parse(cotizacionJSON) : [];

    const tablaProductos = document.getElementById("listaProductosCotizados");
    let totalCotizacion = 0;

    if (cotizacion.length > 0) {
        cotizacion.forEach(producto => {
    const precioUnitario = parseFloat(producto.precioUnitario); // ✅ **Ya es el precio correcto de `productos.json`**
    const cantidad = parseInt(producto.cantidad);
    const totalProducto = precioUnitario * cantidad; // ✅ **Multiplicación correcta**

    totalCotizacion += totalProducto;

    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${producto.descripcion}</td>
        <td>${cantidad}</td>
        <td>Q${precioUnitario.toFixed(2)}</td> <!-- ✅ **Este valor debe ser igual al precioVenta en productos.json** -->
        <td>Q${totalProducto.toFixed(2)}</td> <!-- ✅ **Este es el cálculo correcto** -->
    `;
    tablaProductos.appendChild(fila);
});

    } else {
        console.warn("No hay productos en sessionStorage. Verifica `app.js`.");
        tablaProductos.innerHTML = "<tr><td colspan='4'>No hay productos en la cotización.</td></tr>";
    }

    // **Posicionar correctamente el total de la cotización**
    const filaTotal = document.createElement("tr");
    filaTotal.innerHTML = `
        <td colspan="3"><strong>Total de la Cotización:</strong></td>
        <td><strong>Q${totalCotizacion.toFixed(2)}</strong></td>
    `;
    tablaProductos.appendChild(filaTotal);
});

// **Corrección de los botones**
document.getElementById('volverInicio').addEventListener('click', function () {
    window.location.href = 'index.html';
});

document.getElementById('descargarImagen').addEventListener('click', function () {
    const cotizacion = document.getElementById('cotizacionPreview');

    html2canvas(cotizacion).then(canvas => {
        const enlace = document.createElement('a');
        enlace.href = canvas.toDataURL("image/png");
        enlace.download = "cotizacion.png";
        enlace.click();
    });
});

