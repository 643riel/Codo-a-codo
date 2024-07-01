// Función para generar y mostrar el encabezado estático
function generateStaticHeader() {
    var headerContent = `
<header class="header">
    <nav class="en-linea">
        <a class="hipervinculo" href="../index.html">Inicio</a>
        <a class="hipervinculo" href="../templates/nosotros.html">Sobre nosotros</a>
        <a class="hipervinculo" href="../templates/promos.html">Promociones</a>
        <a class="hipervinculo" href="../templates/form.html">Contactanos</a>
        <a class="hipervinculo" href="../templates/resenias.html">Reseñas</a>
        <a class="hipervinculo" href="../templates/pagina_usuario_admin.html">ADMIN</a>
    </nav>
</header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerContent);
}

// Función principal para inicializar el encabezado
function initializeHeader() {
    generateStaticHeader(); // Generar el encabezado estático

    // Actualizar enlace de "ADMIN" en el encabezado
    var adminLink = document.querySelector('.hipervinculo[href="../templates/pagina_usuario_admin.html"]');
    if (adminLink) {
        adminLink.href = '../templates/pagina_usuario_admin.html';
    }
}

// Llamar a la función principal al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader(); // Inicializar el encabezado
});
