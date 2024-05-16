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

    // Crear elemento para el precio
    var price = document.createElement('p');
    price.innerHTML = precio; // permite usar código html
    price.classList.add('price');

    // Agregar descripción, imagen y precio a la card
    card.appendChild(description);
    card.appendChild(image);
    card.appendChild(price);

    return card;
}

// Obtener el contenedor de las cards
var cardContainer = document.getElementById('card-container');

// Cargar el archivo JSON promos.json
fetch('../static/js/promos.json') // ahora la info de cada card está acá
    .then(response => response.json())
    .then(cardsData => {
        // Crear cards y agregarlas al contenedor
        cardsData.forEach(function(cardData) {
            var card = createCard(cardData.descripcion, cardData.imageUrl, cardData.precio); // función de arriba
            cardContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
