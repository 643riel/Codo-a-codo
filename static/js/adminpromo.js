document.addEventListener("DOMContentLoaded", function() {
    var promosTableBody = document.querySelector("#promosTable tbody");

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
            fetchPromos();
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
        logoutButton.addEventListener("click", function() {
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

    // Función para crear una fila de promoción en la tabla
    function createPromoRow(promoData) {
        var row = document.createElement('tr');

        var idCell = document.createElement('td');
        idCell.textContent = promoData.id; // Mostrar el ID de la promoción
        row.appendChild(idCell);

        var descripcionCell = document.createElement('td');
        descripcionCell.textContent = promoData.descripcion;
        row.appendChild(descripcionCell);

        var imageUrlCell = document.createElement('td');
        imageUrlCell.textContent = promoData.imageUrl; // Mostrar el URL de la promoción en texto
        row.appendChild(imageUrlCell);

        var precioCell = document.createElement('td');
        precioCell.textContent = promoData.precio;
        row.appendChild(precioCell);

        var actionsCell = document.createElement('td');

        var editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-button'); // Añadir clase específica para el botón de editar
        editButton.addEventListener('click', function () {
            editPromo(promoData);
        });
        actionsCell.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button'); // Añadir clase específica para el botón de eliminar
        deleteButton.addEventListener('click', function () {
            deletePromo(promoData.id); // Pasar el ID correcto al eliminar
        });
        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        actionsCell.appendChild(buttonContainer);
    
        row.appendChild(actionsCell);

        row.appendChild(actionsCell);

        return row;
    }

    // Función para manejar la edición de una promoción
    function editPromo(promoData) {
        document.getElementById('promoId').value = promoData.id;
        document.getElementById('promoIdDisplay').textContent = promoData.id; // Mostrar el ID de la promoción
        document.getElementById('descripcionInput').value = promoData.descripcion;
        document.getElementById('imageUrlInput').value = promoData.imageUrl;
        document.getElementById('precioInput').value = promoData.precio;
    }

    // Función para manejar la eliminación de una promoción
    function deletePromo(id) {
        fetch(`http://127.0.0.1:5000/api/promos/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                // Resetear los campos y el ID
                resetPromoForm();
                fetchPromos();
            } else {
                console.error('Error al eliminar la promoción:', response.statusText);
            }
        })
        .catch(error => console.error('Error al eliminar la promoción:', error));
    }

    // Función para resetear el formulario de promoción
    function resetPromoForm() {
        document.getElementById('promoId').value = '';
        document.getElementById('promoIdDisplay').textContent = '';
        document.getElementById('descripcionInput').value = '';
        document.getElementById('imageUrlInput').value = '';
        document.getElementById('precioInput').value = '';
    }

    // Manejar el envío del formulario de promoción
    var promoForm = document.getElementById('promoForm');
    promoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var promoId = document.getElementById('promoId').value;
        var descripcion = document.getElementById('descripcionInput').value.trim();
        var imageUrl = document.getElementById('imageUrlInput').value.trim();
        var precio = document.getElementById('precioInput').value.trim();

        if (!descripcion || !imageUrl || !precio) {
            alert('Todos los campos (Descripción, URL de imagen y Precio) son obligatorios.');
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
                resetPromoForm(); // Resetear el formulario después de enviar la promoción
            }
        })
        .catch(error => console.error('Error al guardar la promoción:', error));
    });

    // Manejar el botón de cancelar en el formulario de promoción
    var cancelPromoButton = document.getElementById('cancelPromoButton');
    if (cancelPromoButton) {
        cancelPromoButton.addEventListener('click', function() {
            resetPromoForm();
        });
    } else {
        console.error('Elemento cancelPromoButton no encontrado.');
    }
});
