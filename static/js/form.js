document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Validaciones
        const nombreInput = document.getElementById('nombre');
        const apellidoInput = document.getElementById('apellido');
        const emailInput = document.getElementById('email');
        const mensajeInput = document.getElementById('mensaje');

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

        if (isValid) {
            // agregar funcionalidad, si es válido, enviarlo
            console.log('Formulario válido. Enviando datos...');
            resetFormStyles();
        } else {
            // Mostrar mensaje de error
            errorMessage.style.display = 'block';
            console.log('Formulario inválido. Por favor, corrija los errores.');
        }
    });

    // Función para añadir estilos de campo inválido
    function addInvalidStyle(element) {
        element.classList.add('invalid');
    }

    // Función para remover estilos de campo inválido
    function removeInvalidStyle(element) {
        element.classList.remove('invalid');
    }

    // Función para resetear los estilos del formulario
    function resetFormStyles() {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            removeInvalidStyle(input);
        });
        errorMessage.style.display = 'none';
    }
});
