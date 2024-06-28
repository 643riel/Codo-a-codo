document.addEventListener('DOMContentLoaded', function() {
    // Función para crear una nueva card de reseña
    function createReviewCard(nombreUsuario, comentario) {
        var card = document.createElement('div');
        card.classList.add('review-card');

        var userName = document.createElement('p');
        userName.textContent = nombreUsuario;
        userName.classList.add('user-name');

        var comment = document.createElement('p');
        comment.textContent = comentario;
        comment.classList.add('comment');

        card.appendChild(userName);
        card.appendChild(comment);

        return card;
    }

    var reviewContainer = document.getElementById('review-container');

    // Función para cargar las reseñas desde la base de datos
    function fetchReviews() {
        fetch('http://127.0.0.1:5000/api/reviews')
            .then(response => {
                console.log('Estado de la respuesta de carga de reseñas:', response.status);
                return response.json();
            })
            .then(reviewsData => {
                console.log('Datos de reseñas cargados:', reviewsData);
                reviewsData.forEach(function(reviewData) {
                    var reviewCard = createReviewCard(reviewData.nombreUsuario, reviewData.comentario);
                    reviewContainer.appendChild(reviewCard);
                });
            })
            .catch(error => console.error('Error al cargar las reseñas desde la base de datos:', error));
    }

    // Función para verificar la autenticación del usuario al cargar la página
    function checkAuthentication() {
        return fetch("http://127.0.0.1:5000/api/current_user", {
            method: "GET",
            credentials: "include"
        })
        .then(response => {
            if (response.status === 401) {
                // Usuario no autenticado
                console.log('Usuario no autenticado.');
                return null; // Opcional: podrías retornar un objeto con información de usuario vacía
            }
            if (!response.ok) {
                throw new Error('Error al verificar la autenticación.');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.username) {
                // Usuario autenticado
                console.log('Usuario autenticado:', data.username);
                return data.username;
            } else {
                // Usuario no autenticado
                console.log('Usuario no autenticado.');
                return null;
            }
        })
        .catch(error => {
            console.error('Error al verificar la autenticación:', error);
            return null;
        });
    }

    // Inicializar la carga de reseñas
    fetchReviews();

    // Verificar la autenticación y actualizar el formulario de reseñas
    checkAuthentication().then(username => {
        var reviewForm = document.getElementById('review-form');
        if (username) {
            document.getElementById('nombre-usuario').value = username;

            // Agregar evento submit al formulario de reseñas solo si el usuario está autenticado
            reviewForm.addEventListener('submit', function(event) {
                event.preventDefault();

                var nombreUsuario = document.getElementById('nombre-usuario').value.trim();
                var comentario = document.getElementById('comentario').value.trim();

                if (!nombreUsuario || !comentario) {
                    alert('Ambos campos, Nombre y Comentario, son obligatorios.');
                    return;
                }

                var nuevaReseña = {
                    nombreUsuario: nombreUsuario,
                    comentario: comentario
                };

                console.log('Enviando nueva reseña:', nuevaReseña);

                fetch('http://127.0.0.1:5000/api/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevaReseña)
                })
                .then(response => {
                    console.log('Estado de la respuesta de envío de reseña:', response.status);
                    return response.json();
                })
                .then(data => {
                    console.log('Respuesta de envío de reseña:', data);
                    if (data.error) {
                        console.error('Error al enviar la nueva reseña:', data.error);
                    } else {
                        var reviewCard = createReviewCard(data.nombreUsuario, data.comentario);
                        reviewContainer.appendChild(reviewCard);

                        alert('Reseña enviada correctamente.');

                        reviewForm.reset();
                    }
                })
                .catch(error => console.error('Error al enviar la nueva reseña:', error));
            });
        } else {
            reviewForm.addEventListener('submit', function(event) {
                event.preventDefault();
                alert('Debes iniciar sesión para dejar una reseña.');
                window.location.href = '../templates/login.html';
            });
        }
    });
});
