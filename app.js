// Referencias a los elementos del DOM
const productoSelect = document.getElementById('producto');
const listaProductos = document.getElementById('listaProductos');
const agregarProductoBtn = document.getElementById('agregarProducto');
const cotizacionForm = document.getElementById('cotizacionForm');
const resultado = document.getElementById('resultado');
const descargarPDFBtn = document.getElementById('descargarPDF');

// Productos cargados desde productos.json
let productosDisponibles = [];
let productosCotizados = []; // Lista de productos agregados a la cotización

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
        option.value = index; // Usamos el índice como identificador
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

    // Crear un nuevo producto para agregar a la lista de productos cotizados
    const productoCotizado = {
        descripcion: producto.descripcion,
        cantidad: cantidad,
        precio: producto.precioVenta,
        total: total
    };

    productosCotizados.push(productoCotizado); // Guardar en la lista de productos cotizados

    // Crear un nuevo elemento para la lista de productos
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
        listaProductos.removeChild(item); // Eliminar de la interfaz
        productosCotizados = productosCotizados.filter(p => p !== productoCotizado); // Eliminar de la lista
    });

    item.appendChild(descripcion);
    item.appendChild(precios);
    item.appendChild(eliminarBtn);
    listaProductos.appendChild(item);

    // Limpiar los campos
    document.getElementById('cantidad').value = '';
});

// Manejar la acción de generar la cotización
cotizacionForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    if (productosCotizados.length === 0) {
        alert("Por favor, agrega al menos un producto antes de generar la cotización.");
        return;
    }

    // Generar el resumen de la cotización
    const nombreCliente = document.getElementById('nombreCliente').value;
    const direccionCliente = document.getElementById('direccionCliente').value;
    const nitCliente = document.getElementById('nitCliente').value;
    const telefonoCliente = document.getElementById('telefonoCliente').value;

    let cotizacionHTML = `
        <h2>Cotización Generada</h2>
        <p><strong>Cliente:</strong> ${nombreCliente}</p>
        <p><strong>Dirección:</strong> ${direccionCliente}</p>
        <p><strong>NIT:</strong> ${nitCliente}</p>
        <p><strong>Teléfono:</strong> ${telefonoCliente}</p>
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Producto</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Precio</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
                </tr>
            </thead>
            <tbody>
    `;

    let totalGeneral = 0;
    productosCotizados.forEach(producto => {
        cotizacionHTML += `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${producto.descripcion}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${producto.cantidad}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">Q ${producto.precio}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">Q ${producto.total}</td>
            </tr>
        `;
        totalGeneral += parseFloat(producto.total);
    });

    cotizacionHTML += `
            </tbody>
        </table>
        <h3>Total General: Q ${totalGeneral.toFixed(2)}</h3>
    `;

    resultado.innerHTML = cotizacionHTML; // Mostrar la cotización en pantalla
    descargarPDFBtn.style.display = "block"; // Mostrar el botón para descargar el PDF

    // Preparar el botón de descarga como PDF
    descargarPDFBtn.addEventListener('click', () => {
        const elemento = document.getElementById('resultado');
        html2pdf().from(elemento).save('cotizacion.pdf');
    });
});





