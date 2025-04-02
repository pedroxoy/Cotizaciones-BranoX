document.addEventListener('DOMContentLoaded', function() {
    const productoSelect = document.getElementById('producto');
    const listaProductosDiv = document.getElementById('listaProductos');
    const agregarProductoBtn = document.getElementById('agregarProducto');
    const generarCotizacionBtn = document.getElementById('generarCotizacion');
    const volverInicioBtn = document.getElementById('volverInicio');

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
        // Aquí puedes agregar la lógica para generar la cotización
        alert('Cotización generada (funcionalidad no implementada)');
    });

    // Volver al inicio
    volverInicioBtn.addEventListener('click', function() {
        // Aquí puedes agregar la lógica para volver al inicio
        alert('Ir al inicio (funcionalidad no implementada)');
    });
});
