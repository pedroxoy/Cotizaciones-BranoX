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
        numeroCotizacion = 1; 
    } else {
        numeroCotizacion = parseInt(numeroCotizacion) + 1;
    }
    localStorage.setItem('numeroCotizacion', numeroCotizacion);
    return numeroCotizacion;
}

// Productos cargados desde productos.json
let productosDisponibles = [];
let productosCotizados = [];

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

// Manejo de productos en la cotización
agregarProductoBtn.addEventListener('click', () => {
    const productoIndex = productoSelect.value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precio = parseFloat(document.getElementById('precio').value);

    if (productoIndex === "" || isNaN(cantidad) || isNaN(precio)) {
        alert("Completa todos los campos antes de agregar un producto.");
        return;
    }

    const producto = productosDisponibles[productoIndex];
    const total = (cantidad * precio).toFixed(2);
    productosCotizados.push({
        descripcion: producto.descripcion,
        cantidad,
        precio,
        total
    });

    const item = document.createElement('div');
    item.innerHTML = `<span>${producto.descripcion} (x${cantidad})</span> <span>Q ${total}</span>`;
    tablaProductos.appendChild(item);
});

// Generar la cotización
cotizacionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (productosCotizados.length === 0) {
        alert("Agrega al menos un producto.");
        return;
    }

    const numeroCotizacion = obtenerNumeroCotizacion();
    const cotizacionHTML = `
        <div>
            <h1>BRANOX</h1>
            <p>${fechaActual} - COT_${numeroCotizacion.toString().padStart(4, '0')}</p>
            <h2>Productos</h2>
            <ul>
                ${productosCotizados.map(p => `<li>${p.descripcion} (x${p.cantidad}) - Q ${p.total}</li>`).join('')}
            </ul>
            <button id="volverInicio">Ir al Inicio</button>
        </div>
    `;

    document.body.innerHTML = cotizacionHTML;

    document.getElementById('volverInicio').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Botón de descarga de imagen
    const descargarImagenBtn = document.createElement('button');
    descargarImagenBtn.textContent = "Descargar Imagen";
    document.body.appendChild(descargarImagenBtn);
    descargarImagenBtn.addEventListener('click', () => {
        html2canvas(document.body).then(canvas => {
            const enlace = document.createElement('a');
            enlace.href = canvas.toDataURL('image/png');
            enlace.download = 'cotizacion.png';
            enlace.click();
        });
    });

    // Botón de descarga de PDF
    const descargarPDFBtn = document.createElement('button');
    descargarPDFBtn.textContent = "Descargar PDF";
    document.body.appendChild(descargarPDFBtn);
    descargarPDFBtn.addEventListener('click', () => {
        html2pdf().from(document.body).save('cotizacion.pdf');
    });
});

