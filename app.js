// 1️⃣ **Cargar productos desde `productos.json` correctamente**
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        console.log("Productos JSON cargados:", data);
        productosDisponibles = data;

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
            option.dataset.precioVenta = producto.precioVenta; // ✅ **Ahora el precio unitario será el precioVenta real**
            productoSelect.appendChild(option);
        });

        console.log("Opciones añadidas al <select>:", productoSelect.innerHTML);
    })
    .catch(error => console.error('Error al cargar productos:', error));

// 2️⃣ **Agregar producto a la cotización**
document.getElementById('agregarProducto').addEventListener('click', function () {
    const productoSelect = document.getElementById('producto');
    const codigoProducto = productoSelect.value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precioUnitario = parseFloat(productoSelect.options[productoSelect.selectedIndex].dataset.precioVenta); // ✅ **Usar precioVenta como precio unitario**

    if (!productosDisponibles.length) {
        alert("Error: La lista de productos aún no ha cargado correctamente.");
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
            cantidad: parseInt(item.querySelector("p:nth-child(2)").textContent.replace("Cantidad: ", "")), // ✅ **Convertir a número**
            precioUnitario: parseFloat(item.querySelector("p:nth-child(3)").textContent.replace("Precio Unitario: Q", "")) // ✅ **Convertir a número**
        });
    });

    if (listaProductosCotizados.length === 0) {
        alert("No hay productos en la cotización.");
        return;
    }

    sessionStorage.setItem('nombreCliente', document.getElementById('nombreCliente').value);
    sessionStorage.setItem('direccionCliente', document.getElementById('direccionCliente').value);
    sessionStorage.setItem('nitCliente', document.getElementById('nitCliente').value);
    sessionStorage.setItem('telefonoCliente', document.getElementById('telefonoCliente').value);
    
    sessionStorage.setItem('cotizacionProductos', JSON.stringify(listaProductosCotizados));

    window.location.href = 'previsualizacion.html';
});
