// Función para manejar el envío del formulario de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var formData = {
        username: document.getElementById('loginUsername').value,
        password: document.getElementById('loginPassword').value
    };

    fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'  // Incluir credenciales en las solicitudes
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                throw new Error(data.error || 'Error en la autenticación');
            }
            return data;
        });
    })
    .then(data => {
        document.getElementById('loginMessage').innerHTML = `<p>${data.message}</p>`;
        localStorage.setItem('username', formData.username); // Almacenar nombre de usuario en localStorage
        window.location.href = 'nosotros.html';  // Redirigir a la página de bienvenida
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('loginMessage').innerHTML = `<p>Error: ${error.message}</p>`;
    });
});

// Función para manejar el envío del formulario de registro
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var formData = {
        username: document.getElementById('registerUsername').value,
        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value
    };

    fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'  // Incluir credenciales en las solicitudes
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                throw new Error(data.error || 'Error en el registro');
            }
            return data;
        });
    })
    .then(data => {
        document.getElementById('registerMessage').innerHTML = `<p>${data.message}</p>`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('registerMessage').innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
