document.addEventListener("DOMContentLoaded", function() {
    var promosTableBody = document.querySelector("#promosTable tbody");

    fetchPromos(); // Cargar promociones al cargar la página

    // Función para cargar las promociones desde la base de datos
    function fetchPromos() {
        fetch('https://giakantas.pythonanywhere.com/api/promos')
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
        actionsCell.appendChild(deleteButton);

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
        fetch(`https://giakantas.pythonanywhere.com/api/promos/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                fetchPromos(); // Recargar las promociones después de eliminar
            } else {
                console.error('Error al eliminar la promoción:', response.statusText);
            }
        })
        .catch(error => console.error('Error al eliminar la promoción:', error));
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
        var url = promoId ? `https://giakantas.pythonanywhere.com/api/promos/${promoId}` : 'https://giakantas.pythonanywhere.com/api/promos';

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
            body: JSON.stringify(nuevaPromo)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error al guardar la promoción:', data.error);
            } else {
                fetchPromos(); // Recargar las promociones después de guardar
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

    // Función para resetear el formulario de promoción
    function resetPromoForm() {
        document.getElementById('promoId').value = '';
        document.getElementById('promoIdDisplay').textContent = '';
        document.getElementById('descripcionInput').value = '';
        document.getElementById('imageUrlInput').value = '';
        document.getElementById('precioInput').value = '';
    }
});
