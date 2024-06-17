// Función para crear una nueva card con descripción, imagen y precio
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

    // Crear elemento para el precio usando innerHTML para interpretar el HTML (así no muestra <br> y cosas así)
    var price = document.createElement('p');
    price.innerHTML = precio;
    price.classList.add('price');

    // Agregar descripción, imagen y precio a la card
    card.appendChild(description);
    card.appendChild(image);
    card.appendChild(price);

    return card;
}

// Obtener el contenedor de las cards
var cardContainer = document.getElementById('card-container');

// Hacer una solicitud a la API para obtener los datos de las promos
fetch('http://localhost:5000/api/promos') // Ruta de la API
    .then(response => response.json())
    .then(cardsData => {
        // Crear cards y agregarlas al contenedor
        cardsData.forEach(function(cardData) {
            var card = createCard(cardData.descripcion, cardData.imageUrl, cardData.precio);
            cardContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error al cargar los datos de la API:', error));
