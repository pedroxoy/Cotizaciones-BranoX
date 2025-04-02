// Botón para generar la cotización y redirigir a la sección correspondiente
document.getElementById('generarCotizacion').addEventListener('click', function () {
    document.getElementById('formularioCotizacion').style.display = 'none';
    document.getElementById('cotizacionGenerada').style.display = 'block';

    // Mostrar información del cliente en la cotización
    const nombre = document.getElementById('nombreCliente').value;
    const direccion = document.getElementById('direccionCliente').value;
    const nit = document.getElementById('nitCliente').value;
    const telefono = document.getElementById('telefonoCliente').value;

    document.getElementById('infoCliente').innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Dirección:</strong> ${direccion}</p>
        <p><strong>NIT:</strong> ${nit}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
    `;
});

// Botón para regresar al formulario inicial
document.getElementById('volverInicio').addEventListener('click', function () {
    document.getElementById('cotizacionGenerada').style.display = 'none';
    document.getElementById('formularioCotizacion').style.display = 'block';
});

// Función para agregar productos desde productos.json
document.getElementById('agregarProducto').addEventListener('click', function () {
    const producto = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;

    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            const selectedProduct = data.find(item => item.nombre === producto);
            if (selectedProduct) {
                const precio = selectedProduct.precio;
                const listaProductos = document.getElementById('listaProductos');
                const productoHTML = `
                    <div class="producto-item">
                        <p><strong>Producto:</strong> ${producto}</p>
                        <p><strong>Cantidad:</strong> ${cantidad}</p>
                        <p><strong>Precio:</strong> Q${(precio * cantidad).toFixed(2)}</p>
                        <button class="eliminarProducto">Eliminar</button>
                    </div>
                `;
                listaProductos.innerHTML += productoHTML;
                
                // Evento para eliminar productos
                listaProductos.querySelectorAll('.eliminarProducto').forEach((btn, index) => {
                    btn.addEventListener('click', function () {
                        this.parentNode.remove();
                    });
                });
            } else {
                alert('Producto no encontrado.');
            }
        })
        .catch(error => console.error('Error al cargar productos:', error));
});

// Función para descargar la cotización como imagen
document.getElementById('descargarImagen').addEventListener('click', function () {
    html2canvas(document.getElementById('cotizacionContent')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'cotizacion.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});
