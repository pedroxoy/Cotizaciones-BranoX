// Función para agregar productos desde productos.json
document.getElementById('agregarProducto').addEventListener('click', function () {
    const producto = document.getElementById('producto').value; // Captura el valor seleccionado
    const cantidad = parseInt(document.getElementById('cantidad').value); // Convierte la cantidad a número

    fetch('productos.json') // Carga el archivo JSON
        .then(response => response.json())
        .then(data => {
            // Busca el producto por su descripción
            const selectedProduct = data.find(item => item.descripcion === producto); 
            if (selectedProduct) {
                const precio = selectedProduct.precioVenta; // Usar 'precioVenta' del JSON
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
                
                // Evento para eliminar productos
                listaProductos.querySelectorAll('.eliminarProducto').forEach((btn) => {
                    btn.addEventListener('click', function () {
                        this.parentNode.remove(); // Elimina el producto del DOM
                    });
                });
            } else {
                alert('Producto no encontrado.');
            }
        })
        .catch(error => console.error('Error al cargar productos:', error));
});
