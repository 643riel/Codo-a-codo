function agregarEstilosCSS() {
    var estilosCSS = `
        /* Estilo básico para todas las páginas */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box; /* Asegura que el tamaño incluya el padding y border */
        }

        #header {
            display: flex;
            flex-wrap: wrap; /* Permite que los elementos se envuelvan a una nueva línea si no caben */
            justify-content: space-between;
            align-items: center;
            background-color: #333;
            color: white;
            padding: 10px;
        }
        
        #header .item {
            min-width: 150px; /* Establece un ancho mínimo para cada elemento */
            white-space: nowrap; /* Evita que el texto se divida en varias líneas */
            overflow: hidden; /* Oculta cualquier parte del texto que no quepa */
            text-overflow: ellipsis; /* Añade puntos suspensivos (...) si el texto es demasiado largo */
            margin-right: 20px; /* Espacio entre los elementos */
        }
        
        body {
            background-color: #1e272e; /* Fondo azul oscuro */
            color: white; /* Color de texto blanco */
            font-family: Arial, sans-serif; /* Fuente por defecto */
            padding-bottom: 60px; //espacio footer
        }

        .en-linea {
            text-align: center; /* Centra los elementos hijos horizontalmente */
        }

        .hipervinculo {
            text-align: center;
            color: white;
            font-weight: bold;
            text-decoration: none;
            margin-bottom: 25px;
            margin: 0 15px;
        }

        .hipervinculo:hover {
            opacity: 0.7;
        }

        /* Estilos para la descripción */
        .descripcion {
            margin-top: 10px;
            background-color: #2c3e50;
            color: #ffffff;
            padding: 20px;
            border-radius: 20px;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
        }

        .descripcion:hover {
            background-color: #34495e;
        }
        
        .descripcion h2 {
            text-align: center;
            font-size: 24px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            margin-bottom: 20px;
        }
        
        .descripcion p {
            text-align: center;
            font-size: 18px;
            margin-bottom: 20px;
        }

        .parrafo-especial {
            font-family: 'Courier New', Courier, monospace;
            text-align: center;
            font-size: 22px;
            margin-bottom: 20px;
            font-weight: bold;
        }

        /* Estilos para el footer */
        #footer {
            text-align: center;
            padding: 20px;
            background-color: #2c3e50;
            color: #ffffff;
            font-size: 14px;
            position: fixed;
            bottom: 0;
            width: 100%;
            box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s;
            border-radius: 10px;
        }

        #footer:hover {
            background-color: #34495e;
        }

        /* Estilos para el contenedor del título */
        .titulo {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #logo {
            display: flex;
            width: 100px;
            max-width: 100px;
            height: auto;
            border-color: bisque;
            border-radius: 50%;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 10px cyan;
        }

        h2 {
            text-align: center;
            margin-top: 10px;
        }

        .titulo h2 {
            font-family: 'Courier New', Courier, monospace;
            font-size: 30px;
            text-align: justify;
            margin-top: 10px;
            margin-left: 20px;
            margin-right: 20px;
            color: floralwhite;
            font-weight: bold;
            justify-content: center;
            align-items: center;
        }

        /* Media query para pantallas pequeñas */
        @media (max-width: 600px) {
            body {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding-bottom: 100px;
                min-height: 100vh; /* Asegura que el cuerpo ocupe al menos toda la altura del viewport */
            }

            .h2 {
                font-size: 16px;
                padding: 15px;
                letter-spacing: 2px;
                text-align: center;
            }

            #footer {
                padding: 15px;
                font-size: 12px;
                border-radius: 10px;
            }
        
            .titulo {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                margin: 0;
                text-align: center;
            }
            
            .descripcion {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-top: 10px;
                margin-bottom: 10px;
                background-color: #2c3e50;
                color: #ffffff;
                padding: 20px;
                border-radius: 20px;
                box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
                width: 90%;
            }
        
            .descripcion h2,
            .descripcion p,
            .parrafo-especial {
                margin-bottom: 10px;
            }
             
            .logo img {
                width: 100%;
                max-width: 400px;
            }
        }

        /* Media query para pantallas medianas */
        @media only screen and (max-width: 1919px) and (min-width: 601px) {
            body {
                min-height: 100vh;
            }
        
            #footer {
                position: fixed; /* Posición fija para que esté siempre en la parte inferior */
                bottom: 0; /* Ancla el footer en la parte inferior */
                width: 100%; /* Ocupa todo el ancho disponible */
                background-color: #2c3e50; /* Ejemplo: color de fondo del footer */
                color: #ffffff; /* Ejemplo: color de texto del footer */
                padding: 15px; /* Ajusta el relleno interno del footer */
                border-radius: 10px; /* Añade bordes redondeados */
            }
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
