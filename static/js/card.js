// Función para crear una nueva card con descripción y una imagen
function createCard(descripcion, imageUrl, precio) {
    // Crear elemento div para la card
    var card = document.createElement('div');
    card.classList.add('card');

    // Crear elemento para la descripción
    var description = document.createElement('p');
    description.textContent = descripcion;
    description.classList.add('description');

    // Crear elemento para la imagen
    var image = document.createElement('img');
    image.src = imageUrl;
    image.alt = 'Imagen';
    image.classList.add('image');

    // Crear elemento para la venta 
    var price = document.createElement('p');
    price.textContent = precio;
    price.innerHTML = precio; // esta propiedad me permite colocar un salto de linea con br en el texto que ingrese
    price.classList.add('price');

    // Agregar descripción e imagen a la card
    card.appendChild(description);
    card.appendChild(image);
    card.appendChild(price);

    return card;
}

// Obtener el contenedor de las cards
var cardContainer = document.getElementById('card-container');

// Crear cards y agregarlas al contenedor
var cards = [
    createCard('Cerveza artesanal alemana', '../static/img/artesanal.jpg', '¡Descubre la auténtica esencia de la cerveza alemana con nuestra selección de importación! Sumérgete en la rica tradición cervecera de Alemania y déjate seducir por el sabor incomparable de nuestras cervezas cuidadosamente seleccionadas:<br><br>Chop Rubia: U$10 <br><br> Chop Negra: U$15 <br><br> Chop Roja: U$15'),
    createCard('Ginebra alemana', '../static/img/gin2.jpg', 'Inspirada en la vibrante fusión de culturas de la histórica ciudad portuaria de Hamburgo y la exótica isla de Zanzíbar, esta ginebra combina lo mejor de dos mundos en una botella:<br><br>Gin-Tonic: U$15 <br><br> Shot: U$5 <br><br> Botella Hamburg Zanzibar: U$30'),
    createCard('Licor aleman', '../static/img/licor-aleman.jpg', ' Desde su creación en la mística Selva Negra de Alemania, Jägermeister ha cautivado a los paladares más exigentes con su distintivo sabor a base de hierbas y especias. Sumérgete en el emblemático mundo de Jägermeister, donde la tradición se encuentra con la innovación en cada gota:<br><br>Shot: U$7 <br><br> Botella Jägermeister: U$35'),
    createCard('Descripción de ejemplo2', 'ejemplo.jpg')
];

cards.forEach(function(card) {
    cardContainer.appendChild(card);
});
