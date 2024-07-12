document.addEventListener("DOMContentLoaded", function () {
    var contactMessagesTableBody = document.querySelector("#contactMessagesTable tbody");

    // Cargar mensajes de contacto al cargar la página
    fetchContactMessages();

    // Función para cargar los mensajes de contacto desde el servidor
    function fetchContactMessages() {
        fetch('https://giakantas.pythonanywhere.com/api/contact_messages')
            .then(response => response.json())
            .then(contactMessagesData => {
                // Ordenar los mensajes por id descendente
                contactMessagesData.sort((a, b) => b.id - a.id);

                contactMessagesTableBody.innerHTML = '';
                contactMessagesData.forEach(function (contactMessageData) {
                    var row = createContactMessageRow(contactMessageData);
                    contactMessagesTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error al cargar los mensajes de contacto:', error));
    }

    // Función para crear una fila de mensaje de contacto en la tabla
    function createContactMessageRow(contactMessageData) {
        var row = document.createElement('tr');

        var idCell = document.createElement('td');
        idCell.textContent = contactMessageData.id;
        row.appendChild(idCell);

        var nombreCell = document.createElement('td');
        nombreCell.textContent = contactMessageData.nombre;
        row.appendChild(nombreCell);

        var apellidoCell = document.createElement('td');
        apellidoCell.textContent = contactMessageData.apellido;
        row.appendChild(apellidoCell);

        var emailCell = document.createElement('td');
        emailCell.textContent = contactMessageData.email;
        row.appendChild(emailCell);

        var mensajeCell = document.createElement('td');
        mensajeCell.textContent = contactMessageData.mensaje;
        row.appendChild(mensajeCell);

        var bebidaCell = document.createElement('td');
        bebidaCell.textContent = contactMessageData.bebida;
        row.appendChild(bebidaCell);

        var fechaCell = document.createElement('td');
        fechaCell.textContent = contactMessageData.created_at;
        row.appendChild(fechaCell);

        var actionsCell = document.createElement('td');

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button'); // Añadir clase específica
        deleteButton.addEventListener('click', function () {
            deleteContactMessage(contactMessageData.id);
        });
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        return row;
    }

    // Función para manejar la eliminación de un mensaje de contacto
    function deleteContactMessage(id) {
        var confirmation = confirm("¿Estás seguro de que quieres eliminar este mensaje de contacto?");
        if (confirmation) {
            fetch(`https://giakantas.pythonanywhere.com/api/contact_messages/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
                .then(response => {
                    if (response.ok) {
                        fetchContactMessages();
                    } else {
                        console.error(`Error al eliminar el mensaje de contacto (${response.status}): ${response.statusText}`);
                    }
                })
                .catch(error => console.error('Error al eliminar el mensaje de contacto:', error));
        } else {
            console.log("Eliminación cancelada.");
        }
    }
    
});
