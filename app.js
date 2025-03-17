// Referencias a los elementos del DOM
const productoSelect = document.getElementById('producto');
const tablaProductos = document.getElementById('listaProductos');
const agregarProductoBtn = document.getElementById('agregarProducto');
const cotizacionForm = document.getElementById('cotizacionForm');
const descargarPDFBtn = document.getElementById('descargarPDF');

// Configurar la fecha actual
const fechaActual = new Date().toISOString().slice(0, 10);

// Función para obtener el número de cotización
function obtenerNumeroCotizacion() {
    let numeroCotizacion = localStorage.getItem('numeroCotizacion');
    if (numeroCotizacion === null) {
        numeroCotizacion = 1; // Número inicial siempre es 1
    } else {
        numeroCotizacion = parseInt(numeroCotizacion) + 1;
    }
    localStorage.setItem('numeroCotizacion', numeroCotizacion);
    return numeroCotizacion;
}

// Productos cargados desde productos.json
let productosDisponibles = [];
let productosCotizados = [];

// Cargar productos desde productos.json
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        productosDisponibles = data;
        cargarProductosEnSelect();
    })
    .catch(error => console.error('Error al cargar productos:', error));

// Función para cargar productos en el <select>
function cargarProductosEnSelect() {
    productosDisponibles.forEach((producto, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${producto.descripcion} (${producto.medida})`;
        productoSelect.appendChild(option);
    });
}

// Manejar la acción de agregar producto
agregarProductoBtn.addEventListener('click', () => {
    const productoIndex = productoSelect.value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precio = parseFloat(document.getElementById('precio').value);

    if (productoIndex === "" || isNaN(cantidad) || isNaN(precio)) {
        alert("Por favor, completa todos los campos antes de agregar un producto.");
        return;
    }

    const producto = productosDisponibles[productoIndex];
    const total = (cantidad * precio).toFixed(2);

    const productoCotizado = {
        descripcion: producto.descripcion,
        cantidad: cantidad,
        precio: precio,
        total: total
    };

    productosCotizados.push(productoCotizado);

    const item = document.createElement('div');
    item.classList.add('producto-item');

    const descripcion = document.createElement('span');
    descripcion.classList.add('producto-descripcion');
    descripcion.textContent = `${producto.descripcion} (x${cantidad})`;

    const precios = document.createElement('span');
    precios.classList.add('producto-precios');
    precios.textContent = `Q ${total}`;

    const eliminarBtn = document.createElement('button');
    eliminarBtn.classList.add('eliminar-producto');
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.addEventListener('click', () => {
        tablaProductos.removeChild(item);
        productosCotizados = productosCotizados.filter(p => p !== productoCotizado);
    });

    item.appendChild(descripcion);
    item.appendChild(precios);
    item.appendChild(eliminarBtn);
    tablaProductos.appendChild(item);

    document.getElementById('cantidad').value = '';
    document.getElementById('precio').value = '';
});

// Manejar la acción de generar la cotización
cotizacionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (productosCotizados.length === 0) {
        alert("Por favor, agrega al menos un producto antes de generar la cotización.");
        return;
    }

    // Mostrar información del cliente
    const nombreCliente = document.getElementById('nombreClienteInput').value;
    const direccionCliente = document.getElementById('direccionClienteInput').value;
    const nitCliente = document.getElementById('nitClienteInput').value;
    const telefonoCliente = document.getElementById('telefonoClienteInput').value;

    const numeroCotizacion = obtenerNumeroCotizacion(); // Obtener el número de cotización

    let cotizacionHTML = `
        <div class="cotizacion-pdf">
            <div class="header-pdf">
                <h1>BRANOX</h1>
                <p>Distribuidora de productos de limpieza</p>
            </div>
            <div class="info-pdf">
                <p>${fechaActual}</p>
                <p>Cotización #${numeroCotizacion}</p>
            </div>
            <div class="cliente-pdf">
                <h2>Información del Cliente</h2>
                <p>Nombre: ${nombreCliente}</p>
                <p>Dirección: ${direccionCliente}</p>
                <p>NIT: ${nitCliente}</p>
                <p>Teléfono: ${telefonoCliente}</p>
            </div>
            <div class="productos-pdf">
                <h2>Productos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Precio Unidad</th>
                            <th>Precio Total</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    let totalGeneral = 0;
    productosCotizados.forEach(producto => {
        cotizacionHTML += `
            <tr>
                <td>${producto.descripcion} (x${producto.cantidad})</td>
                <td>Q ${producto.precio}</td>
                <td>Q ${producto.total}</td>
            </tr>
        `;
        totalGeneral += parseFloat(producto.total);
    });

    cotizacionHTML += `
                    </tbody>
                </table>
            </div>
            <div class="total-pdf">
                <p>Total: Q ${totalGeneral.toFixed(2)}</p>
            </div>
        </div>
    `;

    document.body.innerHTML = cotizacionHTML;
    descargarPDFBtn.style.display = "block";
});

// Preparar el botón de descarga como PDF
descargarPDFBtn.addEventListener('click', () => {
    const elemento = document.querySelector('.cotizacion-pdf');
    html2pdf().from(elemento).save('cotizacion.pdf');
});
