document.addEventListener('DOMContentLoaded', function() {
    const productoSelect = document.getElementById('producto');
    const listaProductosDiv = document.getElementById('listaProductos');
    const agregarProductoBtn = document.getElementById('agregarProducto');
    const generarCotizacionBtn = document.getElementById('generarCotizacion');
    const cotizacionGeneradaDiv = document.getElementById('cotizacionGenerada');
    const volverInicioBtn = document.getElementById('volverInicio');
    const formularioCotizacionDiv = document.getElementById('formularioCotizacion');

    let productosAgregados = [];

    // Cargar productos desde productos.json
    fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            productos.forEach(producto => {
                const option = document.createElement('option');
                option.value = JSON.stringify(producto);
                option.text = producto.descripcion;
                productoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar productos:', error));

    // Agregar producto a la lista
    agregarProductoBtn.addEventListener('click', function() {
        const productoSeleccionado = JSON.parse(productoSelect.value);
        const cantidad = parseInt(document.getElementById('cantidad').value);

        productosAgregados.push({
            producto: productoSeleccionado,
            cantidad: cantidad
        });

        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <p>${productoSeleccionado.descripcion} - Cantidad: ${cantidad} - Precio: $${productoSeleccionado.precioVenta * cantidad}</p>
        `;
        listaProductosDiv.appendChild(productoDiv);
    });

    // Generar cotización
    generarCotizacionBtn.addEventListener('click', function() {
        const nombreCliente = document.getElementById('nombreCliente').value;
        const direccionCliente = document.getElementById('direccionCliente').value;
        const nitCliente = document.getElementById('nitCliente').value;
        const telefonoCliente = document.getElementById('telefonoCliente').value;

        let cotizacionHTML = `
            <h2>Cotización para ${nombreCliente}</h2>
            <p>Dirección: ${direccionCliente}</p>
            <p>NIT: ${nitCliente}</p>
            <p>Teléfono: ${telefonoCliente}</p>
            <h3>Productos:</h3>
            <ul>
        `;

        let totalCotizacion = 0;
        productosAgregados.forEach(item => {
            const subtotal = item.producto.precioVenta * item.cantidad;
            cotizacionHTML += `<li>${item.producto.descripcion} - Cantidad: ${item.cantidad} - Precio: $${subtotal}</li>`;
            totalCotizacion += subtotal;
        });

        cotizacionHTML += `</ul><p>Total: $${totalCotizacion}</p>`;
        cotizacionGeneradaDiv.innerHTML = cotizacionHTML;

        formularioCotizacionDiv.style.display = 'none';
        cotizacionGeneradaDiv.style.display = 'block';
    });

    // Volver al inicio
    volverInicioBtn.addEventListener('click', function() {
        formularioCotizacionDiv.style.display = 'block';
        cotizacionGeneradaDiv.style.display = 'none';
        productosAgregados = [];
        listaProductosDiv.innerHTML = '';
    });
});
