// 1️⃣ Verificar si el JSON se carga correctamente
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        console.log("Productos JSON cargados:", data); // Confirma si llegan los productos
    })
    .catch(error => console.error('Error al cargar productos:', error));

// 2️⃣ Cargar los productos en el `<select>`
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        productosDisponibles = data; // Guardar productos en variable global

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

document.getElementById('agregarProducto').addEventListener('click', function () {
    const codigoProducto = document.getElementById('producto').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);

    if (productosDisponibles.length === 0) {
        alert("Error: La lista de productos aún no ha cargado correctamente.");
        console.error("La lista de productos no está disponible.");
        return;
    }

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

        // Función para eliminar productos
        listaProductos.querySelectorAll('.eliminarProducto').forEach((btn) => {
            btn.addEventListener('click', function () {
                this.parentNode.remove();
            });
        });

        console.log("Producto agregado:", selectedProduct);
    } else {
        alert("Producto no encontrado en la lista disponible.");
        console.error("No se encontró el producto en la lista cargada.");
    }
});

// 4️⃣ **Generar Cotización** y redirigir a la previsualización
document.getElementById('generarCotizacion').addEventListener('click', function () {
    const listaProductosCotizados = document.getElementById('listaProductos').innerHTML;

    if (!listaProductosCotizados.trim()) {
        alert("No hay productos en la cotización.");
        return;
    }

    // Guardar la cotización en sessionStorage para mostrarla en `previsualizacion.html`
    sessionStorage.setItem('cotizacionProductos', listaProductosCotizados);

    // Redirigir a la página de previsualización
    window.location.href = 'previsualizacion.html';
});


