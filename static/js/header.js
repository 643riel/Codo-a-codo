// Función para verificar si el usuario está autenticado
function isUserAuthenticated() {
    return fetch("https://giakantas.pythonanywhere.com/api/current_user", {
        method: "GET",
        credentials: "include"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        return data.username || null; // Devuelve el nombre de usuario si está autenticado
    })
    .catch(error => {
        console.error("Error al verificar el usuario:", error);
        return null;
    });
}

// Función para mostrar el nombre de usuario en el encabezado y actualizar los enlaces
async function displayUserName() {
    var nombreUsuario = await isUserAuthenticated();

    // Actualizar enlace de "Login" en el encabezado
    var loginLink = document.querySelector('.hipervinculo[href="../templates/login.html"]');
    if (loginLink) {
        if (nombreUsuario) {
            // Redirigir a pagina_usuario_admin.html si el usuario es 'GABI'. La seguridad de esto es bastante cuestionable... pero funciona :D
            if (nombreUsuario.toUpperCase() === 'GABI') {
                loginLink.textContent = nombreUsuario.toUpperCase();
                loginLink.href = '../templates/pagina_usuario_admin.html';
            } else {
                // Si hay un nombre de usuario, actualizar el texto y la URL del enlace
                loginLink.textContent = nombreUsuario.toUpperCase(); 
                loginLink.href = '../templates/pagina_usuario.html'; 
                // Si no es admin muestra pantalla de usuario común, para desloguerarse y alguna cosa más, dado que no está en el alcance del curso
            }
        } else {
            // Si no hay nombre de usuario, mostrar LOGIN
            loginLink.textContent = 'LOGIN';
            loginLink.href = '../templates/login.html'; 
        }
    }
    
    // Actualizar saludo de bienvenida si el usuario está logueado
    var nombreUsuarioSpan = document.getElementById('nombreUsuario');
    if (nombreUsuarioSpan) {
        if (nombreUsuario) {
            nombreUsuarioSpan.textContent = nombreUsuario.toUpperCase(); // Mostrar el nombre de usuario en mayúsculas si está logueado
        } else {
            nombreUsuarioSpan.textContent = ''; // Mostrar '' si no esta logueado
        }
    }
}

// Función para generar y mostrar el encabezado estático
function generateStaticHeader() {
    var headerContent = `
    <!-- 
    En las rutas usa .. para quedar en raíz. 
    Esto es para que sin importar donde estoy parado, encuentre el archivo.
    -->

    <header class="header">
        <nav class="en-linea">
            <a class="hipervinculo" href="../index.html">Inicio</a>
            <a class="hipervinculo" href="../templates/nosotros.html">Sobre nosotros</a>
            <a class="hipervinculo" href="../templates/promos.html">Promociones</a>
            <a class="hipervinculo" href="../templates/form.html">Contactanos</a>
            <a class="hipervinculo" href="../templates/resenias.html">Reseñas</a>
            <a class="hipervinculo" href="../templates/login.html">Login</a>
            <!-- <a class="hipervinculo" href="https://www.google.com/" target="_blank">Google</a> -->
        </nav>
    </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerContent);
}

// Función principal para inicializar el encabezado y la visualización del nombre de usuario
async function initializeHeader() {
    generateStaticHeader(); // Generar el encabezado estático
    await displayUserName(); // Mostrar el nombre de usuario si está autenticado
}

// Llamar a la función principal al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader(); // Inicializar el encabezado y la visualización del nombre de usuario
});
