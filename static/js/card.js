// Función para crear una nueva card con descripción y una imagen
function createCard(descripcion, imageUrl) {
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

    // Agregar descripción e imagen a la card
    card.appendChild(description);
    card.appendChild(image);

    return card;
}

// Obtener el contenedor de las cards
var cardContainer = document.getElementById('card-container');

// Crear cards y agregarlas al contenedor
var cards = [
    createCard('Cerveza artesanal alemana', '../static/img/artesanal.jpg'),
    createCard('Otra descripción', 'otra-imagen.jpg'),
    createCard('Descripción de ejemplo', 'ejemplo.jpg'),
    createCard('Descripción de ejemplo2', 'ejemplo.jpg')
];

cards.forEach(function(card) {
    cardContainer.appendChild(card);
});
