// Función para crear una nueva card de reseña
function createReviewCard(nombreUsuario, comentario) {
    // Crear elemento div para la card
    var card = document.createElement('div');
    card.classList.add('review-card');

    // Crear elemento para el nombre de usuario
    var userName = document.createElement('p');
    userName.textContent = nombreUsuario;
    userName.classList.add('user-name');

    // Crear elemento para el comentario
    var comment = document.createElement('p');
    comment.textContent = comentario;
    comment.classList.add('comment');

    // Agregar nombre de usuario y comentario a la card
    card.appendChild(userName);
    card.appendChild(comment);

    return card;
}

// Obtener el contenedor de las reseñas
var reviewContainer = document.getElementById('review-container');

// Cargar las reseñas desde la base de datos
fetch('http://localhost:5000/api/reviews')
    .then(response => response.json())
    .then(reviewsData => {
        // Crear reseñas y agregarlas al contenedor
        reviewsData.forEach(function(reviewData) {
            var reviewCard = createReviewCard(reviewData.nombreUsuario, reviewData.comentario);
            reviewContainer.appendChild(reviewCard);
        });
    })
    .catch(error => console.error('Error al cargar las reseñas desde la base de datos:', error));
