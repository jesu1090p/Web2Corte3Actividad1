document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');

    logoutButton.addEventListener('click', () => {
        // Elimina el token de la cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Redirige al usuario a la página de inicio de sesión
        window.location.href = '/index.html'; // Cambia la URL a la ruta de tu página de inicio de sesión
    });
});
