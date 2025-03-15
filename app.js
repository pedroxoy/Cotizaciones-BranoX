// Lista de productos disponibles
const productosDisponibles = [
    { descripcion: "Detergente para ropa Manzana Verde | 4 Litros", precio: 175 },
    { descripcion: "Suavizante para telas Flor de Manzana | 4 Litros", precio: 210 },
    { descripcion: "Jabón líquido para trastes | 1 Litro", precio: 45 }
];

// Referencias a los elementos del DOM
const productoSelect = document.getElementById('producto');
const listaProductos = document.getElementById('listaProductos');
const agregarProductoBtn = document.getElementById('agregarProducto');

// Cargar productos en el <select>
productosDisponibles.forEach((producto, index) => {
    const option = document.createElement('option');
    option.value = index; // El valor será el índice del producto
    option.textContent = producto.descripcion;
    productoSelect.appendChild(option);
});

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

    // Crear un nuevo elemento para la lista de productos
    const item = document.createElement('div');
    item.classList.add('producto-item');

    const descripcion = document.createElement('span');
    descripcion.classList.add('producto-descripcion');
    descripcion.textContent = `${producto.descripcion} (x${cantidad})`;

    const precios = document.createElement('span');
    precios.classList.add('producto-precios');
    precios.textContent = `Q ${total}`;

    item.appendChild(descripcion);
    item.appendChild(precios);
    listaProductos.appendChild(item);

    // Limpiar los campos
    document.getElementById('cantidad').value = '';
    document.getElementById('precio').value = '';
});





