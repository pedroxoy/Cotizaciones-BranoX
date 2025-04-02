// JavaScript anterior

generarCotizacionBtn.addEventListener('click', function() {
    // Generar cotización y mostrarla
});

volverInicioBtn.addEventListener('click', function() {
    // Volver al formulario de cotización
});

// Nuevas funciones para descargar imagen
document.getElementById('descargarImagen').addEventListener('click', function() {
    html2canvas(document.getElementById('cotizacionContent')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'cotizacion.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});
