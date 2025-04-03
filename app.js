// Variable global para almacenar los productos disponibles
let productosDisponibles = [];

// **1. Cargar productos en el `<select>` cuando la página se inicia**
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        productosDisponibles = data; // Guardar productos en la variable global

        const productoSelect = document.getElementById('producto');
        if (!productoSelect) {
            console.error("No se encontró el elemento <select> con id 'producto'.");
            return;
        }

        data.forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.codigo; // Se usa el código como `value`
            option.textContent = `${producto.descripcion} (${producto.medida})`; // Texto visible en el select
            productoSelect.appendChild(option);
        });

        console.log("Productos cargados en el <select>:", productoSelect.innerHTML);
    })
    .catch(error => console.error('Error al cargar productos:', error));

// **2. Agregar productos al pedido**
document.getElementById('agregarProducto').addEventListener('click', function () {
    const codigoProducto = document.getElementById('producto').value; // Capturar código
    const cantidad = parseInt(document.getElementById('cantidad').value); // Capturar cantidad

    // **No necesitamos hacer otro `fetch()` aquí**, porque ya guardamos los productos en `productosDisponibles`
    const selectedProduct = productosDisponibles.find(item => item.codigo === codigoProducto);

    if (selectedProduct) {
        const precio = selectedProduct.precioVenta;
        const listaProductos = document.getElementById('listaProductos');

        const productoHTML = `
            <div class="producto-item">
                <p><strong>Producto:</strong> ${selectedProduct.descripcion} (${selectedProduct.medida})</p>
                <p><strong>Cantidad:</strong> ${cantidad}</p>
                <p><strong>Precio:</strong> Q${(precio * cantidad).toFixed(2)}</p>
                <button class="eliminarProducto">Eliminar</button>
            </div>
        `;
        listaProductos.innerHTML += productoHTML;
        
        // **Eliminar productos**
        listaProductos.querySelectorAll('.eliminarProducto').forEach((btn) => {
            btn.addEventListener('click', function () {
                this.parentNode.remove(); // Elimina el producto del DOM
            });
        });

    } else {
        alert('Producto no encontrado.');
    }
});
