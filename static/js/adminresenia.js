document.addEventListener("DOMContentLoaded", function () {
    var reviewsTableBody = document.querySelector("#reviewsTable tbody");

    // Verificar si el usuario está autenticado
    fetch("http://127.0.0.1:5000/api/current_user", {
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
            if (data.username) {
                document.getElementById("nombreUsuario").textContent = data.username;
                fetchReviews();
            } else {
                window.location.href = "login.html"; // Redirigir a la página de inicio de sesión si no está autenticado
            }
        })
        .catch(error => {
            console.error("Error al verificar el usuario:", error);
            window.location.href = "login.html"; // Redirigir a la página de inicio de sesión en caso de error
        });

    // Manejar el cierre de sesión
    var logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            fetch("http://127.0.0.1:5000/api/logout", {
                method: "POST",
                credentials: "include"
            })
                .then(response => {
                    if (response.ok) {
                        window.location.href = "../index.html"; // Redirigir a index
                    } else {
                        console.error("Error al cerrar sesión:", response.statusText);
                    }
                })
                .catch(error => console.error("Error al cerrar sesión:", error));
        });
    } else {
        console.error("Elemento logoutButton no encontrado.");
    }

    // Función para cargar las reseñas desde la base de datos
    function fetchReviews() {
        fetch('http://127.0.0.1:5000/api/reviews')
            .then(response => response.json())
            .then(reviewsData => {
                reviewsTableBody.innerHTML = '';
                reviewsData.forEach(function (reviewData) {
                    var row = createReviewRow(reviewData);
                    reviewsTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error al cargar las reseñas desde la base de datos:', error));
    }

    // Función para crear una fila de reseña en la tabla
    // Función para crear una fila de reseña en la tabla
    function createReviewRow(reviewData) {
        var row = document.createElement('tr');

        var idCell = document.createElement('td');
        idCell.textContent = reviewData.id; // Mostrar el ID de la reseña
        row.appendChild(idCell);

        var nameCell = document.createElement('td');
        nameCell.textContent = reviewData.nombreUsuario;
        row.appendChild(nameCell);

        var commentCell = document.createElement('td');
        commentCell.textContent = reviewData.comentario;
        row.appendChild(commentCell);

        var actionsCell = document.createElement('td');

        var editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-button'); // Añadir clase específica
        editButton.addEventListener('click', function () {
            editReview(reviewData);
        });
        actionsCell.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button'); // Añadir clase específica
        deleteButton.addEventListener('click', function () {
            deleteReview(reviewData.id); // Pasar el ID correcto al eliminar
        });
        actionsCell.appendChild(deleteButton);

        //contenedor para los botones
        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        actionsCell.appendChild(buttonContainer);
    
        row.appendChild(actionsCell);

        return row;
    }

    // Función para manejar la edición de una reseña
    function editReview(reviewData) {
        document.getElementById('reviewId').value = reviewData.id;
        document.getElementById('reviewIdDisplay').textContent = reviewData.id; // Mostrar el ID de la reseña
        document.getElementById('nombreUsuarioInput').value = reviewData.nombreUsuario;
        document.getElementById('comentarioInput').value = reviewData.comentario;
    }

    // Función para manejar la eliminación de una reseña
    function deleteReview(id) {
        fetch(`http://127.0.0.1:5000/api/reviews/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    // Resetear los campos y el ID
                    resetForm();
                    fetchReviews();
                } else {
                    console.error('Error al eliminar la reseña:', response.statusText);
                }
            })
            .catch(error => console.error('Error al eliminar la reseña:', error));
    }

    // Función para resetear el formulario de reseña
    function resetForm() {
        document.getElementById('reviewId').value = '';
        document.getElementById('reviewIdDisplay').textContent = '';
        document.getElementById('nombreUsuarioInput').value = '';
        document.getElementById('comentarioInput').value = '';
    }

    // Manejar el envío del formulario de reseña
    var reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var reviewId = document.getElementById('reviewId').value;
        var nombreUsuario = document.getElementById('nombreUsuarioInput').value.trim();
        var comentario = document.getElementById('comentarioInput').value.trim();

        if (!nombreUsuario || !comentario) {
            alert('Ambos campos, Nombre y Comentario, son obligatorios.');
            return;
        }

        var method = reviewId ? 'PUT' : 'POST';
        var url = reviewId ? `http://127.0.0.1:5000/api/reviews/${reviewId}` : 'http://127.0.0.1:5000/api/reviews';

        var nuevaReseña = {
            nombreUsuario: nombreUsuario,
            comentario: comentario
        };

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(nuevaReseña)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error al guardar la reseña:', data.error);
                } else {
                    fetchReviews();
                    resetForm(); // Resetear el formulario después de enviar la reseña
                }
            })
            .catch(error => console.error('Error al guardar la reseña:', error));
    });

    // Manejar el botón de cancelar en el formulario de reseña
    var cancelReviewButton = document.getElementById('cancelReviewButton');
    if (cancelReviewButton) {
        cancelReviewButton.addEventListener('click', function () {
            resetForm();
        });
    } else {
        console.error('Elemento cancelReviewButton no encontrado.');
    }
});
