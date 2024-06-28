//RESEÑAS

document.addEventListener("DOMContentLoaded", function() {
    var reviewForm = document.getElementById("reviewForm");
    var reviewsTableBody = document.querySelector("#reviewsTable tbody");
    var cancelReviewButton = document.getElementById("cancelReviewButton");

    // Verificar si el usuario está autenticado para reseñas
    fetchAndCheckUser();

    // Manejar el envío del formulario de reseña
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        handleReviewFormSubmit();
    });

    // Manejar el clic en el botón de cancelar
    cancelReviewButton.addEventListener('click', function() {
        resetReviewForm();
    });

    // Función para cargar las reseñas desde la base de datos
    function fetchReviews() {
        fetch('http://127.0.0.1:5000/api/reviews')
            .then(response => response.json())
            .then(reviewsData => {
                reviewsTableBody.innerHTML = '';
                reviewsData.forEach(function(reviewData) {
                    var row = createReviewRow(reviewData);
                    reviewsTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error al cargar las reseñas desde la base de datos:', error));
    }

    // Función para manejar el envío del formulario de reseña
    function handleReviewFormSubmit() {
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
                resetReviewForm();
            }
        })
        .catch(error => console.error('Error al guardar la reseña:', error));
    }

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
        editButton.addEventListener('click', function() {
            editReview(reviewData);
        });
        actionsCell.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', function() {
            deleteReview(reviewData.id); // Pasar el ID correcto al eliminar
        });
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        return row;
    }

    // Función para manejar la edición de una reseña
    function editReview(reviewData) {
        document.getElementById('formTitle').textContent = 'Editar reseña';
        document.getElementById('reviewId').value = reviewData.id;
        document.getElementById('reviewIdDisplay').textContent = `ID: ${reviewData.id}`; // Mostrar el ID en el formulario
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
                fetchReviews();
                resetReviewForm();
            } else {
                console.error('Error al eliminar la reseña:', response.statusText);
            }
        })
        .catch(error => console.error('Error al eliminar la reseña:', error));
    }

    // Función para verificar si el usuario está autenticado para las reseñas
    function fetchAndCheckUser() {
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
                fetchReviews(); // Cargar reseñas al autenticarse
            } else {
                window.location.href = "login.html"; // Redirigir a la página de inicio de sesión si no está autenticado
            }
        })
        .catch(error => {
            console.error("Error al verificar el usuario:", error);
            window.location.href = "login.html"; // Redirigir a la página de inicio de sesión en caso de error
        });
    }

    // Función para resetear el formulario de reseña
    function resetReviewForm() {
        reviewForm.reset();
        document.getElementById('formTitle').textContent = 'Agregar una nueva reseña';
        document.getElementById('reviewId').value = ''; // Limpiar el ID después de cancelar
        document.getElementById('reviewIdDisplay').textContent = ''; // Limpiar el display de ID
    }
});


// PROMOS 

document.addEventListener("DOMContentLoaded", function() {
    var promoForm = document.getElementById("promoForm");
    var promosTableBody = document.querySelector("#promosTable tbody");
    var cancelPromoButton = document.getElementById("cancelPromoButton");

    // Verificar si el usuario está autenticado para promociones
    fetchAndCheckUser();

    // Manejar el envío del formulario de promoción
    promoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        handlePromoFormSubmit();
    });

    // Manejar el clic en el botón de cancelar
    cancelPromoButton.addEventListener('click', function() {
        resetPromoForm();
    });

    // Función para cargar las promociones desde la base de datos
    function fetchPromos() {
        fetch('http://127.0.0.1:5000/api/promos')
            .then(response => response.json())
            .then(promosData => {
                promosTableBody.innerHTML = '';
                promosData.forEach(function(promoData) {
                    var row = createPromoRow(promoData);
                    promosTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error al cargar las promociones desde la base de datos:', error));
    }

    // Función para manejar el envío del formulario de promoción
    function handlePromoFormSubmit() {
        var promoId = document.getElementById('promoId').value;
        var descripcion = document.getElementById('descripcionInput').value.trim();
        var imageUrl = document.getElementById('imageUrlInput').value.trim() || 'default';
        var precio = document.getElementById('precioInput').value.trim();

        if (!descripcion || !precio) {
            alert('Todos los campos (Descripción y Precio) son obligatorios.');
            return;
        }

        var method = promoId ? 'PUT' : 'POST';
        var url = promoId ? `http://127.0.0.1:5000/api/promos/${promoId}` : 'http://127.0.0.1:5000/api/promos';

        var nuevaPromo = {
            descripcion: descripcion,
            imageUrl: imageUrl,
            precio: precio
        };

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(nuevaPromo)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error al guardar la promoción:', data.error);
            } else {
                fetchPromos();
                resetPromoForm();
            }
        })
        .catch(error => console.error('Error al guardar la promoción:', error));
    }

    // Función para crear una fila de promoción en la tabla
    function createPromoRow(promoData) {
        var row = document.createElement('tr');

        var idCell = document.createElement('td');
        idCell.textContent = promoData.id;
        row.appendChild(idCell);

        var descripcionCell = document.createElement('td');
        descripcionCell.textContent = promoData.descripcion;
        row.appendChild(descripcionCell);

        var imageUrlCell = document.createElement('td');
        imageUrlCell.textContent = promoData.imageUrl;
        row.appendChild(imageUrlCell);

        var precioCell = document.createElement('td');
        precioCell.textContent = promoData.precio;
        row.appendChild(precioCell);

        var actionsCell = document.createElement('td');

        var editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', function() {
            editPromo(promoData);
        });
        actionsCell.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', function() {
            deletePromo(promoData.id);
        });
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        return row;
    }

    // Función para manejar la edición de una promo
    function editPromo(promoData) {
        document.getElementById('promoFormTitle').textContent = 'Editar promoción';
        document.getElementById('promoIdDisplay').textContent = `ID: ${promoData.id}`;
        document.getElementById('promoId').value = promoData.id;
        document.getElementById('descripcionInput').value = promoData.descripcion;
        document.getElementById('imageUrlInput').value = promoData.imageUrl;
        document.getElementById('precioInput').value = promoData.precio;
    }

    // Función para manejar la eliminación de una promo
    function deletePromo(id) {
        fetch(`http://127.0.0.1:5000/api/promos/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                fetchPromos();
                resetPromoForm();
            } else {
                console.error('Error al eliminar la promo:', response.statusText);
            }
        })
        .catch(error => console.error('Error al eliminar la promo:', error));
    }

    // Función para verificar si el usuario está autenticado para las promociones
    function fetchAndCheckUser() {
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
                fetchPromos();
            } else {
                window.location.href = "login.html";
            }
        })
        .catch(error => {
            console.error("Error al verificar el usuario:", error);
            window.location.href = "login.html";
        });
    }

    // Función para resetear el formulario de promoción
    function resetPromoForm() {
        promoForm.reset();
        document.getElementById('promoFormTitle').textContent = 'Agregar una nueva promoción';
        document.getElementById('promoId').value = '';
        document.getElementById('promoIdDisplay').textContent = '';
        document.getElementById('imageUrlInput').value = '../static/img/'; // para que el usuario complete
    }
});
