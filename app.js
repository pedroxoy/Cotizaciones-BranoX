// Referencias a los elementos del DOM
const productoSelect = document.getElementById('producto');
const listaProductos = document.getElementById('listaProductos');
const agregarProductoBtn = document.getElementById('agregarProducto');

// Productos cargados desde productos.json
let productosDisponibles = [];

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
        listaProductos.removeChild(item);
    });

    item.appendChild(descripcion);
    item.appendChild(precios);
    item.appendChild(eliminarBtn);
    listaProductos.appendChild(item);

    // Limpiar los campos
    document.getElementById('cantidad').value = '';
    document.getElementById('precio').value = '';
});





