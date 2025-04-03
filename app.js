// 1️⃣ Cargar productos desde `productos.json`
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        console.log("Productos JSON cargados:", data); // Confirmar que los productos se cargan
        productosDisponibles = data; // Guardar productos en variable global

        const productoSelect = document.getElementById('producto');
        if (!productoSelect) {
            console.error("No se encontró el <select> con id 'producto'.");
            return;
        }

        productoSelect.innerHTML = ""; // Limpiar el select antes de añadir productos

        data.forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.codigo;
            option.textContent = `${producto.descripcion} (${producto.medida})`;
            option.dataset.precioVenta = producto.precioVenta; // **Guardar el precio unitario en el select**
            productoSelect.appendChild(option);
        });

        console.log("Opciones añadidas al <select>:", productoSelect.innerHTML);
    })
    .catch(error => console.error('Error al cargar productos:', error));

// 2️⃣ Agregar producto a la cotización
document.getElementById('agregarProducto').addEventListener('click', function () {
    const productoSelect = document.getElementById('producto');
    const codigoProducto = productoSelect.value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precioUnitario = parseFloat(productoSelect.options[productoSelect.selectedIndex].dataset.precioVenta); // **Usar precioVenta directamente**

    if (!productosDisponibles.length) {
        alert("Error: La lista de productos aún no ha cargado correctamente.");
        console.error("La lista de productos no está disponible.");
        return;
    }

    const selectedProduct = productosDisponibles.find(item => item.codigo === codigoProducto);

    if (selectedProduct) {
        const listaProductos = document.getElementById('listaProductos');
        const productoHTML = `
            <div class="producto-item">
                <p><strong>Producto:</strong> ${selectedProduct.descripcion} (${selectedProduct.medida})</p>
                <p><strong>Cantidad:</strong> ${cantidad}</p>
                <p><strong>Precio Unitario:</strong> Q${precioUnitario.toFixed(2)}</p> 
                <button class="eliminarProducto">Eliminar</button>
            </div>
        `;
        listaProductos.innerHTML += productoHTML;

        // **Función para eliminar productos**
        listaProductos.querySelectorAll('.eliminarProducto').forEach(btn => {
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

// 3️⃣ **Generar Cotización y guardar los datos sin modificar el precio**
document.getElementById('generarCotizacion').addEventListener('click', function () {
   const listaProductosCotizados = [];
document.querySelectorAll("#listaProductos .producto-item").forEach(item => {
    listaProductosCotizados.push({
        descripcion: item.querySelector("p:nth-child(1)").textContent.replace("Producto: ", ""),
        cantidad: parseInt(item.querySelector("p:nth-child(2)").textContent.replace("Cantidad: ", "")),
        precioUnitario: parseFloat(item.dataset.precioVenta) // ✅ **Guardar precioVenta directamente como precio unitario**
    });
});


    if (listaProductosCotizados.length === 0) {
        alert("No hay productos en la cotización.");
        return;
    }

    // **Guardar la información del cliente**
    sessionStorage.setItem('nombreCliente', document.getElementById('nombreCliente').value);
    sessionStorage.setItem('direccionCliente', document.getElementById('direccionCliente').value);
    sessionStorage.setItem('nitCliente', document.getElementById('nitCliente').value);
    sessionStorage.setItem('telefonoCliente', document.getElementById('telefonoCliente').value);
    
    // **Guardar productos sin modificar precios**
    sessionStorage.setItem('cotizacionProductos', JSON.stringify(listaProductosCotizados));

    // **Redirigir a la previsualización**
    window.location.href = 'previsualizacion.html';
});

