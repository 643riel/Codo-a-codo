// formv1.js es la versión vieja sin la lógica del mail, la dejo en git x las dudas
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto
        sendMail();
    });

    function sendMail() {
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
        let bebidaSeleccionada = '';
        bebidaInputs.forEach(input => {
            if (input.checked) {
                bebidaSelected = true;
                bebidaSeleccionada = input.value;
            }
        });

        if (!bebidaSelected) {
            isValid = false;
            bebidaInputs.forEach(input => addInvalidStyle(input));
        } else {
            bebidaInputs.forEach(input => removeInvalidStyle(input));
        }

        if (isValid) {
            // Construir el cuerpo del correo
            const subject = `Formulario de Contacto: ${nombre} ${apellido}`;
            const body = `Nombre: ${nombre}\nApellido: ${apellido}\nEmail: ${email}\nMensaje: ${mensaje}\nBebida preferida: ${bebidaSeleccionada}`;

            // Crear el enlace mailto con la dirección de correo wunder.3ar.ar@gmail.com
            const mailtoLink = `mailto:wunder.3ar.ar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Abrir Gmail (o el cliente de correo predeterminado)
            window.location.href = mailtoLink;

            // Mostrar mensaje de éxito o resetear el formulario
            alert('¡El correo electrónico se ha preparado correctamente!');
            form.reset(); // Resetear el formulario después de enviar el correo
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

    // Función para resetear los estilos del formulario
    function resetFormStyles() {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            removeInvalidStyle(input);
        });
        errorMessage.style.display = 'none';
    }
});
