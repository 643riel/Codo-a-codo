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
            nombreInput.style.color = 'red'; // Cambiar color de texto a rojo. En CSS está el selector de .invalid
        } else {
            nombreInput.classList.remove('invalid');
            nombreInput.style.color = 'black'; // Cambiar color de texto a negro. Al final no lo definí en CSS para que quede con el color que tenía
        }

        // Validación del apellido
        if (!/^[a-zA-Z]+$/.test(apellido)) {
            isValid = false;
            apellidoInput.classList.add('invalid');
            apellidoInput.style.color = 'red'; 
        } else {
            apellidoInput.classList.remove('invalid');
            apellidoInput.style.color = 'black'; 
        }

        // Validación del correo electrónico
        if (!/\S+@\S+\.\S+/.test(email)) {
            isValid = false;
            emailInput.classList.add('invalid');
            emailInput.style.color = 'red'; 
        } else {
            emailInput.classList.remove('invalid');
            emailInput.style.color = 'black'; 
        }

        // Validación del mensaje vacío
        if (mensaje === '') {
            isValid = false;
            mensajeInput.classList.add('invalid');
            mensajeInput.style.color = 'red';
        } else {
            mensajeInput.classList.remove('invalid');
            mensajeInput.style.color = 'black';
        }

        if (isValid) {
            // agregar funcionalidad, si es válido, enviarlo
            console.log('Formulario válido. Enviando datos...');
        } else {
            console.log('Formulario inválido. Por favor, corrija los errores.');
        }
    });
});
