document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

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
            nombreInput.classList.add('invalid');
        } else {
            nombreInput.classList.remove('invalid');
        }

        // Validación del apellido
        if (!/^[a-zA-Z]+$/.test(apellido)) {
            isValid = false;
            apellidoInput.classList.add('invalid');
        } else {
            apellidoInput.classList.remove('invalid');
        }

        // Validación del correo electrónico
        if (!/\S+@\S+\.\S+/.test(email)) {
            isValid = false;
            emailInput.classList.add('invalid');
        } else {
            emailInput.classList.remove('invalid');
        }

        // Si el formulario es válido, puedes enviar los datos
        if (isValid) {
            // Aquí puedes agregar código para enviar los datos del formulario a un servidor
            // Por ejemplo, podrías utilizar Fetch API o AJAX para enviar los datos a un servidor PHP
            console.log('Formulario válido. Enviando datos...');
        } else {
            console.log('Formulario inválido. Por favor, corrija los errores.');
        }
    });
});
