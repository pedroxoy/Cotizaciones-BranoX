// Referencias a los elementos del DOM
const productoSelect = document.getElementById('producto');
const tablaProductos = document.getElementById('tablaProductos').getElementsByTagName('tbody')[0];
const agregarProductoBtn = document.getElementById('agregarProducto');
const cotizacionForm = document.getElementById('cotizacionForm');
const descargarPDFBtn = document.getElementById('descargarPDF');

// Configurar la fecha actual y un número de cotización
const fechaActual = new Date().toISOString().slice(0, 10);
const numeroCotizacion = `COT-${Math.floor(Math.random() * 100000)}`;

// Asignar valores al DOM
document.getElementById('fechaCotizacion').textContent = fechaActual;
document.getElementById('numeroCotizacion').textContent = numeroCotizacion;

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

    if (productoIndex === "" || isNaN(cantidad)) {
        alert("Por favor, completa todos los campos antes de agregar un producto.");
        return;
    }

    const producto = productosDisponibles[productoIndex];
    const total = (cantidad * producto.precioVenta).toFixed(2);

    const productoCotizado = {
        descripcion: producto.descripcion,
        cantidad: cantidad,
        precio: producto.precioVenta,
        total: total
    };

    productosCotizados.push(productoCotizado);

    const newRow = tablaProductos.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.textContent = `${producto.descripcion} (x${cantidad})`;
    cell2.textContent = `Q ${producto.precioVenta}`;
    cell3.textContent = `Q ${total}`;

    document.getElementById('cantidad').value = '';
});

// Manejar la acción de generar la cotización
cotizacionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (productosCotizados.length === 0) {
        alert("Por favor, agrega al menos un producto antes de generar la cotización.");
        return;
    }

    // Mostrar información del cliente
    document.getElementById('nombreCliente').textContent = document.getElementById('nombreClienteInput').value;
    document.getElementById('direccionCliente').textContent = document.getElementById('direccionClienteInput').value;
    document.getElementById('nitCliente').textContent = document.getElementById('nitClienteInput').value;
    document.getElementById('telefonoCliente').textContent = document.getElementById('telefonoClienteInput').value;

    // Calcular total general
    let totalGeneral = productosCotizados.reduce((acc, producto) => acc + parseFloat(producto.total), 0).toFixed(2);
    document.getElementById('montoTotal').textContent = totalGeneral;

    descargarPDFBtn.style.display = "block";
});

// Preparar el botón de descarga como PDF
descargarPDFBtn.addEventListener('click', () => {
    const elemento = document.querySelector('.container-narrow'); // Contenedor principal
    html2pdf().from(elemento).save('cotizacion.pdf');
});


