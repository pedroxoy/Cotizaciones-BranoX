const productos = [
    { descripcion: "Detergente para ropa Manzana Verde | 4 Litros", precio: "Q 175.00" },
    { descripcion: "Suavizante para telas Flor de Manzana | 4 Litros", precio: "Q 210.00" },
    { descripcion: "Jabón líquido para trastes | 1 Litro", precio: "Q 45.00" }
];

const listaProductos = document.getElementById('listaProductos');

productos.forEach(producto => {
    const item = document.createElement('div');
    item.classList.add('producto-item');

    const descripcion = document.createElement('span');
    descripcion.classList.add('producto-descripcion');
    descripcion.textContent = producto.descripcion;

    const precios = document.createElement('span');
    precios.classList.add('producto-precios');
    precios.textContent = producto.precio;

    item.appendChild(descripcion);
    item.appendChild(precios);
    listaProductos.appendChild(item);
});






