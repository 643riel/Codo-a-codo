function agregarEstilosCSS() {
    var estilosCSS = `
        /* Estilo básico para todas las páginas */

        /* FONDO Y LINKS */
        * {
            margin: 0;
            padding: 0;
        }

        body {
            background-color: #1e272e; /* Fondo azul oscuro */
            color: white; /* Color de texto blanco */
            font-family: Arial, sans-serif; /* Fuente por defecto */
        }

        .en-linea {
            text-align: center; /* centra los elementos hijos horizontalmente */
        }

        .hipervinculo {
            text-align: center; /* centra el texto */
            color: white; /* color de fuente = blanco */
            font-weight: bold; /* negrita */
            text-decoration: none; /* saca el subrayado */
            margin-bottom: 25px; /* margen inferior de 25px */
            margin: 0 15px; /* margen horizontal de 15px, entre hipervínculos */
        }

        .hipervinculo:hover {
            opacity: 0.7; /* al pasar el mouse, reduce opacidad */
        }

        /* --------- */

        /* TEXTO */
         .descripcion {
            margin-top: 10px; /* Margen superior de 20px */
            background-color: #2c3e50; /* Color de fondo */
            color: #ffffff; /* Color de texto blanco */
            padding: 20px; /* Espaciado interno */
            border-radius: 20px; /* Borde redondeado */
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5); /* Sombra */
        }
        
        .descripcion h2 {
            text-align: center; /* Centra el título */
            font-size: 24px; /* Tamaño de fuente */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Sombra de texto */
            margin-bottom: 20px; /* Margen inferior */
        }
        
        .descripcion p {
            text-align: justify; /* Alinea el texto justificado */
            font-size: 18px; /* Tamaño de fuente */
            margin-bottom: 20px; /* Margen inferior */
        }

        /* FOOTER */
        #footer {
            text-align: center; /* Centra el texto del footer */
            padding: 20px; /* Añade espaciado alrededor del contenido del footer */
            background-color: #2c3e50; /* Color de fondo */
            color: #ffffff; /* Color de texto blanco */
            font-size: 14px; /* Tamaño de fuente */
            position: fixed; /* Fija el footer en la parte inferior de la ventana */
            bottom: 0; /* Alinea el footer en la parte inferior de la ventana */
            width: 100%; /* Establece el ancho al 100% */
        }

        /* Estilos para el contenedor del título */
        .titulo {
            display: flex;
            align-items: center;
        }

        #logo{
            width: 100px;
            max-width: 100px;
            height: auto;
            border-color: bisque;
            border-radius: 50%;
            margin-left: 42%;
            margin-right: 10px;
            box-shadow: 0 0 10px cyan;
        }

        h2{
            text-align: center;
            margin-top: 10px;
        }
    `;

    var estilo = document.createElement('style');

    if (estilo.styleSheet) {
        estilo.styleSheet.cssText = estilosCSS;
    } else {
        estilo.appendChild(document.createTextNode(estilosCSS));
    }

    document.head.appendChild(estilo);
}

// Llama a la función para agregar los estilos CSS al documento
agregarEstilosCSS();