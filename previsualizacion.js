document.addEventListener("DOMContentLoaded", function () {
    const cotizacion = JSON.parse(sessionStorage.getItem("cotizacionProductos"));

    if (cotizacion && cotizacion.length > 0) {
        const listaProductos = document.getElementById("listaProductosCotizados");
        let totalCotizacion = 0;

        cotizacion.forEach(producto => {
            const totalProducto = producto.precioVenta * producto.cantidad;
            totalCotizacion += totalProducto;

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.descripcion} (${producto.medida})</td>
                <td>${producto.cantidad}</td>
                <td>Q${producto.precioVenta.toFixed(2)}</td>
                <td class="precioTotal">Q${totalProducto.toFixed(2)}</td>
            `;

            listaProductos.appendChild(fila);
        });

        document.getElementById("totalCotizacion").textContent = totalCotizacion.toFixed(2);
    } else {
        document.getElementById("listaProductosCotizados").innerHTML = "<tr><td colspan='4'>No hay productos en la cotización.</td></tr>";
    }
});

// Botón para volver al inicio
document.getElementById('volverInicio').addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirige a la página principal
});
