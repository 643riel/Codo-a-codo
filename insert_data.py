import os
from sqlalchemy import create_engine
from models import db, Promo, ContactMessage, User, Review, generate_password_hash
from app import app

# Función para ejecutar el archivo SQL
def execute_sql_file(sql_file):
    engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
    connection = engine.raw_connection()
    cursor = connection.cursor()

    with open(sql_file, 'r') as file:
        sql_statements = file.read()

    statements = sql_statements.split(';')

    for statement in statements:
        if statement.strip():
            try:
                print(f"Ejecutando sentencia SQL:\n{statement}")
                cursor.execute(statement)
                connection.commit()
            except Exception as e:
                print(f"Error al ejecutar la sentencia:\n{statement}\nError: {e}")
                break

    connection.close()

# Función para insertar los datos
def insert_data():
    promos = [
        Promo(
            descripcion="Cerveza artesanal alemana",
            imageUrl="../static/img/artesanal.jpg",
            precio="¡Descubrí la auténtica esencia de la cerveza alemana con nuestra selección de importación! Sumergíte en la rica tradición cervecera de Alemania y dejate seducir por el sabor incomparable de nuestras cervezas cuidadosamente seleccionadas:<br><br><b><i>Chop Rubia</i></b>: US$10 <br><br> <b><i>Chop Negra</i></b>: US$15 <br><br><b><i>Chop Roja</i></b>: US$15"
        ),
        Promo(
            descripcion="Ginebra alemana",
            imageUrl="../static/img/gin2.jpg",
            precio="Inspirada en la vibrante fusión de culturas de la histórica ciudad portuaria de Hamburgo y la exótica isla de Zanzíbar, esta ginebra combina lo mejor de dos mundos en una botella:<br><br><b><i>Gin-Tonic</i></b>: US$15 <br><br><b><i>Shot</i></b>: US$5 <br><br><b><i>Botella Hamburg Zanzibar</i></b>: US$30"
        ),
        Promo(
            descripcion="Licor alemán",
            imageUrl="../static/img/licor-aleman.jpg",
            precio="Desde su creación en la mística Selva Negra de Alemania, Jägermeister ha cautivado a los paladares más exigentes con su distintivo sabor a base de hierbas y especias. Sumergíte en el emblemático mundo de Jägermeister, donde la tradición se encuentra con la innovación en cada gota:<br><br><b><i>Shot</i></b>: US$7 <br><br><b><i>Botella Jägermeister</i></b>: US$35"
        ),
        Promo(
            descripcion="Salchichas alemanas",
            imageUrl="../static/img/salchicha.jpg",
            precio="Las salchichas alemanas son una deliciosa tradición culinaria que ha trascendido fronteras y conquistado paladares en todo el mundo. Con su distintivo sabor ahumado y su textura jugosa, estas salchichas son el epítome de la excelencia gastronómica alemana:<br><br><b><i>Salchichas alemanas al vino</i></b>: US$15<br><br><b><i>Hot Dog</i></b>: US$10"
        ),
        Promo(
            descripcion="Choripan",
            imageUrl="../static/img/chori.jpg",
            precio="Originarios de Argentina, estos deliciosos bocados combinan la intensidad de la carne de chorizo con la suavidad del pan criollo. Cada mordisco es una fiesta para los sentidos, con el aroma tentador de las especias y el sabor ahumado de la carne a la parrilla<br><br><b><i>Chori Completo</i></b>: US$10<br><br><b><i>Wunderchori</i></b>: US$14"
        ),
        Promo(
            descripcion="Tabla de fiambres",
            imageUrl="../static/img/picada.jpg",
            precio="En nuestra tabla de fiambres, te invitamos a disfrutar de una selección cuidadosamente elaborada de los más exquisitos embutidos y quesos que nuestra tierra tiene para ofrecer. Desde el auténtico salame argentino hasta el sabor intenso del queso criollo, cada bocado es un viaje sensorial que te transportará a las pampas argentinas:<br><br><b><i>Para 2</i></b>: US$10<br><br><b><i>Para 4</i></b>: US$15"
        )
    ]

    insert_contact1 = ContactMessage(
        nombre='Juan',
        apellido='Perez',
        email='juan@gmail.com',
        mensaje='Hola, quiero más información sobre las promociones de cerveza artesanal alemana.',
        bebida='cerveza'
    )

    insert_contact2 = ContactMessage(
        nombre='María',
        apellido='González',
        email='maria@gmail.com',
        mensaje='Me gustaría reservar una mesa para la tabla de fiambres para 4 personas.',
        bebida='vino'
    )

    example_reviews = [
        Review(nombreUsuario='✨GABRIEL IAKANTAS✨', comentario='El mejor bar de Argentina lejos. Muy barato todo. Excelente servicio. Vengan.'),
        Review(nombreUsuario='Juan', comentario='La cerveza estaba caliente.'),
        Review(nombreUsuario='Ana', comentario='Es una mugre esto.'),
    ]

    admin_user = User(
        username='Gabi',
        email='iakantasgabriel@gmail.com',
        password_hash=generate_password_hash('1234')
    )

    example_user = User(
        username='test',
        email='aaaaa@aaaa.com',
        password_hash=generate_password_hash('1234')
    )

    with app.app_context():
        db.session.add(admin_user)
        db.session.add(example_user)
        db.session.add_all(promos)
        db.session.add(insert_contact1)
        db.session.add(insert_contact2)
        db.session.add_all(example_reviews)
        db.session.commit()

if __name__ == "__main__":
    # Verificar el directorio de trabajo actual
    current_directory = os.getcwd()
    print(f"Directorio actual de trabajo: {current_directory}")

    # Ruta al archivo SQL
    sql_file = 'sql.sql'
    sql_file_path = os.path.abspath(sql_file)
    print(f"Ruta completa del archivo SQL: {sql_file_path}")

    # Ejecutar el archivo SQL y luego insertar los datos
    if os.path.exists(sql_file):
        execute_sql_file(sql_file)
        insert_data()
        print('------------------REGISTROS INSERTADOS------------------')
    else:
        print(f"Archivo {sql_file} no encontrado en la ruta: {sql_file_path}")
