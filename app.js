 // app.js

 document.addEventListener("DOMContentLoaded", function () {
     const nombreCliente = document.getElementById("nombreCliente");
     const direccionCliente = document.getElementById("direccionCliente");
     const nitCliente = document.getElementById("nitCliente");
     const telefonoCliente = document.getElementById("telefonoCliente");
     const listaProductos = document.getElementById("listaProductos");
     const totalCotizacion = document.getElementById("totalCotizacion");
     const cotizacionForm = document.getElementById("cotizacionForm");
     const descargarPDF = document.getElementById("descargarPDF");
     const volverInicio = document.getElementById("volverInicio");
     const productoSelect = document.getElementById('producto');
     const cantidadInput = document.getElementById('cantidad');
     const precioInput = document.getElementById('precio');
     const agregarProductoBtn = document.getElementById('agregarProducto');

     // Datos de prueba (reemplaza con tu lógica de obtención de datos - por ejemplo, desde un formulario o una API)
     const datosCliente = {
         nombre: "Pedro Zambrano",
         direccion: "Ciudad",
         nit: "12345678-9",
         telefono: "555-1234",
     };

     // Mostrar datos del cliente
     nombreCliente.textContent = datosCliente.nombre;
     direccionCliente.textContent = datosCliente.direccion;
     nitCliente.textContent = datosCliente.nit;
     telefonoCliente.textContent = datosCliente.telefono;

     let productosCotizados = [];
     let productosDisponibles = [];

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

     agregarProductoBtn.addEventListener('click', () => {
         const productoIndex = parseInt(productoSelect.value);
         const cantidad = parseInt(cantidadInput.value);
         const precio = parseFloat(precioInput.value);

         if (isNaN(productoIndex) || isNaN(cantidad) || isNaN(precio)) {
             alert("Por favor, selecciona un producto y completa la cantidad y el precio.");
             return;
         }

         const producto = productosDisponibles[productoIndex];
         const total = cantidad * precio;

         productosCotizados.push({
             descripcion: producto.descripcion,
             cantidad: cantidad,
             precioUnitario: precio,
             precioTotal: total.toFixed(2),
         });

         mostrarProductos();
         cantidadInput.value = ""; // Clear input fields
         precioInput.value = "";
     });

     // Función para mostrar los productos en la tabla
     function mostrarProductos() {
         let total = 0;
         listaProductos.innerHTML = ""; // Limpiar la tabla

         productosCotizados.forEach((producto) => {
             total += parseFloat(producto.precioTotal);

             const fila = document.createElement("tr");
             fila.innerHTML = `
                 <td>${producto.descripcion}</td>
                 <td>${producto.cantidad}</td>
                 <td>Q ${producto.precioUnitario}</td>
                 <td>Q ${producto.precioTotal}</td>
             `;
             listaProductos.appendChild(fila);
         });

         totalCotizacion.textContent = `Q ${total.toFixed(2)}`;
     }

     mostrarProductos(); // Mostrar los productos iniciales (si los hay)

     // Función para generar el PDF
     function generarPDF() {
         descargarPDF.style.display = "block"; // Show the download button
         const elementoCotizacion = document.querySelector(".cotizacion");

         html2pdf()
             .from(elementoCotizacion)
             .save("cotizacion.pdf");
     }

     // Evento para el botón "Descargar PDF"
     descargarPDF.addEventListener("click", generarPDF);

     //evento para el boton "ir al inicio"
     volverInicio.addEventListener("click", function () {
         window.location.href = "login.html";
     });
 });
