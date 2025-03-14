document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
    let productosCotizacion = [];

    document.getElementById('cotizacionForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const nombreCliente = document.getElementById('nombreCliente').value;
        const direccionCliente = document.getElementById('direccionCliente').value;
        const nitCliente = document.getElementById('nitCliente').value;
        const telefonoCliente = document.getElementById('telefonoCliente').value;

        let totalCotizacion = 0;
        const cotizacion = {
            nombreCliente: nombreCliente,
            direccionCliente: direccionCliente,
            nitCliente: nitCliente,
            telefonoCliente: telefonoCliente,
            productos: productosCotizacion
        };

        const cotizacionHTML = `
            <div class="factura">
                <h2 style="color: #ff0000;">BRANOX</h2>
                <p>Distribuidora de productos de limpieza</p>
                <div class="header">
                    <p>${new Date().toLocaleDateString()}</p>
                    <span>Cotización #${Math.floor(Math.random() * 10000)}</span>
                </div>
                <h3>Información del Cliente</h3>
                <p>Nombre: ${cotizacion.nombreCliente}</p>
                <p>Dirección: ${cotizacion.direccionCliente}</p>
                <p>NIT: ${cotizacion.nitCliente}</p>
                <p>Teléfono: ${cotizacion.telefonoCliente}</p>
                <h3>Productos</h3>
                <div class="precios-header">
                    <span class="descripcion">Descripción</span>
                    <span class="precio">Precio Unidad</span>
                    <span class="precio">Precio Total</span>
                </div>
                <ul>
                    ${cotizacion.productos.map(producto => {
                        const precioTotal = producto.cantidad * producto.precio;
                        totalCotizacion += precioTotal;
                        return `<li><span>${producto.cantidad} - ${producto.descripcion} | ${producto.medida}</span><span>Q ${producto.precio}</span><span>Q ${precioTotal}</span></li>`;
                    }).join('')}
                </ul>
                <h3 class="total">Total: Q ${totalCotizacion}</h3>
            </div>
        `;
        document.getElementById('resultado').innerHTML = cotizacionHTML;

        // Mostrar botón de descarga en PDF
        document.getElementById('descargarPDF').style.display = 'block';
    });

    document.getElementById('agregarProducto').addEventListener('click', function() {
        const productoDescripcion = document.getElementById('producto').value;
        const productoCantidad = document.getElementById('cantidad').value;
        const productoPrecio = document.getElementById('precio').value;

        const producto = {
            descripcion: productoDescripcion,
            cantidad: productoCantidad,
            precio: productoPrecio,
            medida: document.querySelector(`#producto option[value="${productoDescripcion}"]`).textContent.split('(')[1].replace(')', '')
        };

        productosCotizacion.push(producto);

        const li = document.createElement('li');
        li.innerHTML = `${productoCantidad} - ${productoDescripcion} | ${producto.medida} - Q ${productoPrecio} <button class="eliminar">Eliminar</button>`;
        document.getElementById('listaProductos').appendChild(li);

        li.querySelector('.eliminar').addEventListener('click', function() {
            const index = productosCotizacion.indexOf(producto);
            if (index > -1) {
                productosCotizacion.splice(index, 1);
                document.getElementById('listaProductos').removeChild(li);
            }
        });
    });

    document.getElementById('descargarPDF').addEventListener('click', function() {
        const cotizacionElement = document.querySelector('.factura');
        const opt = {
            margin: 0.5,
            filename: 'cotizacion.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1.5 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        const elementWidth = cotizacionElement.offsetWidth;
        const pdfWidth = elementWidth / 1.5;

        cotizacionElement.style.width = `${pdfWidth}px`;

        html2pdf().set(opt).from(cotizacionElement).toContainer().toCanvas().toPdf().get('pdf').then(function (pdf) {
            var totalPages = pdf.internal.getNumberOfPages();
            for (var i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setLineWidth(0.5);
                pdf.line(0.5, 0.5, pdf.internal.pageSize.width - 0.5, 0.5);
                pdf.line(0.5, pdf.internal.pageSize.height - 0.5, pdf.internal.pageSize.width - 0.5, pdf.internal.pageSize.height - 0.5);
                pdf.line(0.5, 0.5, 0.5, pdf.internal.pageSize.height - 0.5);
                pdf.line(pdf.internal.pageSize.width - 0.5, 0.5, pdf.internal.pageSize.width - 0.5, pdf.internal.pageSize.height - 0.5);
            }
        }).save().then(function() {
            cotizacionElement.style.width = '';
        });
    });

    document.getElementById('agregarProductoForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const descripcion = document.getElementById('descripcion').value;
        const precioVenta = document.getElementById('precioVenta').value;
        const codigo = document.getElementById('codigo').value;
        const categoria = document.getElementById('categoria').value;
        const medida = document.getElementById('medida').value;

        const nuevoProducto = {
            descripcion: descripcion,
            precioVenta: precioVenta,
            codigo: codigo,
            categoria: categoria,
            medida: medida
        };

        agregarProducto(nuevoProducto);

        // Limpiar los campos del formulario
        document.getElementById('descripcion').value = '';
        document.getElementById('precioVenta').value = '';
        document.getElementById('codigo').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('medida').value = '';
    });
});

function cargarProductos() {
    fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            const selectProducto = document.getElementById('producto');
            selectProducto.innerHTML = '';
            productos.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.descripcion;
                option.textContent = `${producto.descripcion} - ${producto.codigo} (${producto.medida})`;
                selectProducto.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar productos:', error));
}

function agregarProducto(producto) {
    fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            if (!Array.isArray(productos)) {
                productos = [];
            }
            productos.push(producto);
            return fetch('saveProductos.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productos)
            });
        })
        .then(() => cargarProductos())
        .catch(error => console.error('Error al agregar producto:', error));
}





