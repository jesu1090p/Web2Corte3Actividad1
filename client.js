document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 200) {
            const data = await response.json();
            alert(data.message);
            window.location.href = '/welcome.html'; // Redirige a la ruta protegida
        } else {
            alert('Usuario no creado');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;

        const response = await fetch('/register', {
            method: 'POST', // Cambiar el método a POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: newUsername, password: newPassword }), // Enviar datos de registro
        });

        if (response.status === 200) {
            const data = await response.json();
            alert(data.message);
            window.location.href = '/welcome.html'; // Redirige a la ruta protegida
        } else {
            alert('Error al registrar usuario');
        }
    });
});