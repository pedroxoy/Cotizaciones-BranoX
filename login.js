document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error');

    // Credenciales únicas permitidas
    const validEmail = "pedrozambrano354@gmail.com";
    const validPassword = "y1e2s3i4...";

    if (email === validEmail && password === validPassword) {
        sessionStorage.setItem("autenticado", true); // Marca al usuario como autenticado
        window.location.href = "index.html"; // Redirige a la cotización
    } else {
        errorMessage.textContent = "Correo o contraseña incorrectos";
        errorMessage.style.display = "block";
    }
});
