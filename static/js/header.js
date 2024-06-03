// Contenido del encabezado
var headerContent = `
<!-- 
En las rutas usa .. para quedar en raíz. 
Esto es para que sin importar donde estoy parado, encuentre el archivo.
-->

<header class="header">
<nav class="en-linea">
    <a class="hipervinculo" href="../index.html">Inicio</a>
    <a class="hipervinculo" href="../template/nosotros.html">Sobre nosotros</a>
    <a class="hipervinculo" href="../template/promos.html">Promociones</a>
    <a class="hipervinculo" href="../template/form.html">Contactanos</a>
    <a class="hipervinculo" href="../template/resenias.html">Reseñas</a>
    <!-- <a class="hipervinculo" href="https://www.google.com/" target="_blank">Google</a> -->
</nav>
</header>
`;

// Agregar el contenido del encabezado al principio del body
document.body.insertAdjacentHTML('afterbegin', headerContent);
