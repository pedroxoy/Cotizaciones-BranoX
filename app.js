// 1️⃣ Verificar si el JSON se carga correctamente
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        console.log("Productos JSON cargados:", data); // Confirma si llegan los productos
    })
    .catch(error => console.error('Error al cargar productos:', error));

// 2️⃣ Luego puedes colocar la lógica de llenado del <select> aquí
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        const productoSelect = document.getElementById('producto');
        if (!productoSelect) {
            console.error("No se encontró el elemento <select> con id 'producto'.");
            return;
        }

        productoSelect.innerHTML = ""; // Limpiar el select antes de añadir productos

        data.forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.codigo;
            option.textContent = `${producto.descripcion} (${producto.medida})`;
            productoSelect.appendChild(option);
        });

        console.log("Opciones añadidas al <select>:", productoSelect.innerHTML);
    })
    .catch(error => console.error('Error al cargar productos:', error));

// 3️⃣ Finalmente, la función para agregar productos al pedido
document.getElementById('agregarProducto').addEventListener('click', function () {
    const codigoProducto = document.getElementById('producto').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);

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

        listaProductos.querySelectorAll('.eliminarProducto').forEach((btn) => {
            btn.addEventListener('click', function () {
                this.parentNode.remove();
            });
        });
    } else {
        alert('Producto no encontrado.');
    }
});

