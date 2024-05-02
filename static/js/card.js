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
    createCard('Cerveza artesanal alemana', '../static/img/artesanal.jpg', 'Chop Rubia: U$10 <br> Chop Negra: U$15 <br> Chop Roja: U$15'),
    createCard('Ginebra alemana', '../static/img/gin2.jpg', 'Gin-Tonic: U$15 <br> Shot: U$5 <br> Botella Hamburg Zanzibar: U$30'),
    createCard('Licor aleman', '../static/img/licor-aleman.jpg', 'Shot: U$7 <br> Botella Jägermeister: U$35'),
    createCard('Descripción de ejemplo2', 'ejemplo.jpg')
];

cards.forEach(function(card) {
    cardContainer.appendChild(card);
});
