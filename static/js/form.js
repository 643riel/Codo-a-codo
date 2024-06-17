document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const errorMessage = document.getElementById('errorMessage');

    // Obtener todos los inputs y textareas del formulario
    const inputs = form.querySelectorAll('input, textarea');

    // Función para validar y enviar el formulario
    function sendForm(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Validaciones
        const nombreInput = document.getElementById('nombre');
        const apellidoInput = document.getElementById('apellido');
        const emailInput = document.getElementById('email');
        const mensajeInput = document.getElementById('mensaje');
        const bebidaInputs = document.getElementsByName('bebida');

        const nombre = nombreInput.value.trim();
        const apellido = apellidoInput.value.trim();
        const email = emailInput.value.trim();
        const mensaje = mensajeInput.value.trim();

        let isValid = true;

        // Validación del nombre
        if (!/^[a-zA-Z]+$/.test(nombre)) {
            isValid = false;
            addInvalidStyle(nombreInput);
        } else {
            removeInvalidStyle(nombreInput);
        }

        // Validación del apellido
        if (!/^[a-zA-Z]+$/.test(apellido)) {
            isValid = false;
            addInvalidStyle(apellidoInput);
        } else {
            removeInvalidStyle(apellidoInput);
        }

        // Validación del correo electrónico
        if (!/\S+@\S+\.\S+/.test(email)) {
            isValid = false;
            addInvalidStyle(emailInput);
        } else {
            removeInvalidStyle(emailInput);
        }

        // Validación del mensaje vacío
        if (mensaje === '') {
            isValid = false;
            addInvalidStyle(mensajeInput);
        } else {
            removeInvalidStyle(mensajeInput);
        }

        // Validación del radio button
        let bebidaSelected = false;
        bebidaInputs.forEach(input => {
            if (input.checked) {
                bebidaSelected = true;
            }
        });

        if (!bebidaSelected) {
            isValid = false;
            bebidaInputs.forEach(input => addInvalidStyle(input));
        } else {
            bebidaInputs.forEach(input => removeInvalidStyle(input));
        }

        if (isValid) {
            // Enviar los datos al servidor Flask (en el puerto 5000)
            const formData = new FormData(form);

            fetch('http://127.0.0.1:5000/api/contact', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                if (result.message) {
                    alert('¡El mensaje se ha enviado correctamente!');
                    form.reset(); 
                    // Resetear el formulario después de enviar el mensaje
                    // Ocultar el mensaje de error después de enviar correctamente
                    errorMessage.style.display = 'none';
                } else {
                    alert('Error al enviar el mensaje: ' + result.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al enviar el mensaje.');
            });
        } else {
            // Mostrar mensaje de error
            errorMessage.style.display = 'block';
            console.log('Formulario inválido. Por favor, corrija los errores.');
        }
    }

    // Función para añadir estilos de campo inválido
    function addInvalidStyle(element) {
        element.classList.add('invalid');
    }

    // Función para remover estilos de campo inválido
    function removeInvalidStyle(element) {
        element.classList.remove('invalid');
    }

    // Manejar el evento submit del formulario
    form.addEventListener('submit', sendForm);

    // Manejar el evento input en los campos para validar y actualizar estilos en tiempo real
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(input);
        });
    });

    // Función para validar un campo específico y actualizar estilos
    function validateField(field) {
        const value = field.value.trim();
        const isValid = validate(value, field);

        if (isValid) {
            removeInvalidStyle(field);
            errorMessage.style.display = 'none'; // Ocultar el mensaje de error si es válido
        } else {
            addInvalidStyle(field);
        }
    }

    // Función general de validación para cada tipo de campo
    function validate(value, field) {
        switch (field.id) {
            case 'nombre':
            case 'apellido':
                return /^[a-zA-Z]+$/.test(value);
            case 'email':
                return /\S+@\S+\.\S+/.test(value);
            case 'mensaje':
                return value !== '';
            // Para los radio buttons, se valida en la función sendForm
            default:
                return true;
        }
    }

});
