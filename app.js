document.addEventListener("DOMContentLoaded", function () {
    const nombreCliente = document.getElementById("nombreCliente");
    const direccionCliente = document.getElementById("direccionCliente");
    const nitCliente = document.getElementById("nitCliente");
    const telefonoCliente = document.getElementById("telefonoCliente");
    const listaProductos = document.getElementById("listaProductos");
    const totalCotizacion = document.getElementById("totalCotizacion");
    const cotizacionForm = document.getElementById("cotizacionForm");
    const descargarPDF = document.getElementById("descargarPDF");
    const volverInicio = document.getElementById("volverInicio");
    const productoSelect = document.getElementById('producto');
    const cantidadInput = document.getElementById('cantidad');
    const agregarProductoBtn = document.getElementById('agregarProducto');
    const generarCotizacionBtn = document.getElementById('generarCotizacion');
    const cotizacionGenerada = document.getElementById('cotizacionGenerada');
    const formularioCotizacion = document.getElementById('formularioCotizacion');

    let productosCotizados = [];
    let productosDisponibles = [];

    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productosDisponibles = data;
            cargarProductosEnSelect();
        })
        .catch(error => console.error('Error al cargar productos:', error));

    function cargarProductosEnSelect() {
        productosDisponibles.forEach((producto, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${producto.descripcion} (${producto.medida})`;
            productoSelect.appendChild(option);
        });
    }

    agregarProductoBtn.addEventListener('click', () => {
        const productoIndex = parseInt(productoSelect.value);
        const cantidad = parseInt(cantidadInput.value);

        if (isNaN(productoIndex) || isNaN(cantidad)) {
            alert("Por favor, selecciona un producto y completa la cantidad.");
            return;
        }

        const producto = productosDisponibles[productoIndex];
        const total = cantidad * producto.precioVenta;

        productosCotizados.push({
            descripcion: producto.descripcion,
            cantidad: cantidad,
            precioUnitario: producto.precioVenta,
            precioTotal: total.toFixed(2),
        });

        mostrarProductos();
        cantidadInput.value = ""; // Clear input fields
    });

    // Función para mostrar los productos en la tabla
    function mostrarProductos() {
        let total = 0;
        listaProductos.innerHTML = ""; // Limpiar la tabla

        productosCotizados.forEach((producto) => {
            total += parseFloat(producto.precioTotal);

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.descripcion}</td>
                <td>${producto.cantidad}</td>
                <td>Q ${producto.precioUnitario}</td>
                <td>Q ${producto.precioTotal}</td>
            `;
            listaProductos.appendChild(fila);
        });

        totalCotizacion.textContent = `Q ${total.toFixed(2)}`;
    }

    mostrarProductos(); // Mostrar los productos iniciales (si los hay)

    generarCotizacionBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Crear el HTML de la cotización
        let cotizacionHTML = `
            <div class="cotizacion">
                <header>
                    <h1 class="branox-header">BRANOX</h1>
                    <p>Distribuidora de productos de limpieza</p>
                    <p id="fechaCotizacion"></p>
                    <p id="numeroCotizacion"></p>
                </header>

                <h2>Información del Cliente</h2>
                <div class="cliente-info">
                    <p><strong>Nombre:</strong> ${nombreCliente.value}</p>
                    <p><strong>Dirección:</strong> ${direccionCliente.value}</p>
                    <p><strong>NIT:</strong> ${nitCliente.value}</p>
                    <p><strong>Teléfono:</strong> ${telefonoCliente.value}</p>
                </div>

                <h2>Productos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Precio Unidad</th>
                            <th>Precio Total</th>
                        </tr>
                    </thead>
                    <tbody id="listaProductosGenerada">
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3"><strong>Total:</strong></td>
                            <td id="totalCotizacionGenerada">Q 0.00</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;

        // Llenar la tabla de productos en la cotización generada
        let total = 0;
        let listaProductosGenerada = "";
        productosCotizados.forEach((producto) => {
            total += parseFloat(producto.precioTotal);
            listaProductosGenerada += `
                <tr>
                    <td>${producto.descripcion}</td>
                    <td>${producto.cantidad}</td>
                    <td>Q ${producto.precioUnitario}</td>
                    <td>Q ${producto.precioTotal}</td>
                </tr>
            `;
        });

        cotizacionHTML = cotizacionHTML.replace('<tbody id="listaProductosGenerada"></tbody>', `<tbody id="listaProductosGenerada">${listaProductosGenerada}</tbody>`);
        cotizacionHTML = cotizacionHTML.replace('<td id="totalCotizacionGenerada">Q 0.00</td>', `<td id="totalCotizacionGenerada">Q ${total.toFixed(2)}</td>`);

        cotizacionGenerada.innerHTML = cotizacionHTML;
        cotizacionGenerada.style.display = 'block';
        formularioCotizacion.style.display = 'none';

        // Obtener la fecha actual y el número de cotización (puedes generarlo dinámicamente)
        const fechaActual = new Date().toLocaleDateString();
        const numeroCotizacion = "Cotización #9"; // Reemplaza con tu lógica

        // Mostrar la fecha y el número de cotización en el HTML
        document.getElementById("fechaCotizacion").textContent = fechaActual;
        document.getElementById("numeroCotizacion").textContent = numeroCotizacion;

        // Generar el PDF
        generarPDF();
    });

    // Función para generar el PDF
    function generarPDF() {
        descargarPDF.style.display = "block"; // Show the download button
        const elementoCotizacion = document.querySelector(".cotizacion");

        html2pdf()
            .from(elementoCotizacion)
            .save("cotizacion.pdf");
    }

    // Evento para el botón "Descargar PDF"
    descargarPDF.addEventListener("click", generarPDF);

    //evento para el boton "ir al inicio"
    volverInicio.addEventListener("click", function () {
        window.location.href = "login.html";
    });
});
