document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('error');

    // Validación básica (deberías tener una validación más robusta)
    if (email === 'usuario@ejemplo.com' && password === 'contrasena') {
        sessionStorage.setItem('autenticado', 'true');
        window.location.href = 'index.html';
    } else {
        errorElement.textContent = 'Correo electrónico o contraseña incorrectos.';
    }
});
