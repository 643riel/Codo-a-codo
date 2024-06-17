from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

# Configurar la aplicación Flask
app = Flask(__name__)

# Configurar la conexión a la base de datos MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://usuario-test:1234@localhost:3306/wunderbar'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # Clave secreta para Flask-Login
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

# Configurar CORS para permitir acceso desde el frontend con credenciales
CORS(app, supports_credentials=True)

# Crear el objeto SQLAlchemy para interactuar con la base de datos
db = SQLAlchemy(app)

# Configurar Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

# Definir el modelo de datos para la tabla Promo
class Promo(db.Model):
    __tablename__ = 'promos'
    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(255), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=False)
    precio = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return f'<Promo {self.descripcion}>'

# Definir el modelo de datos para la tabla ContactMessage
class ContactMessage(db.Model):
    __tablename__ = 'contact_messages'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    apellido = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    mensaje = db.Column(db.Text, nullable=False)
    bebida = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<ContactMessage {self.nombre} {self.apellido}>'

# Definir el modelo de datos para la tabla User
class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'
    
class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    nombreUsuario = db.Column(db.String(255), nullable=False)
    comentario = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Review {self.nombreUsuario}>'

# Configuración de Flask-Login para cargar usuarios
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Rutas API

# Ruta para obtener todas las promos
@app.route('/api/promos', methods=['GET'])
def get_promos():
    try:
        promos = Promo.query.all()
        promo_list = []
        for promo in promos:
            promo_data = {
                'descripcion': promo.descripcion,
                'imageUrl': promo.imageUrl,
                'precio': promo.precio
            }
            promo_list.append(promo_data)
        return jsonify(promo_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para recibir los mensajes de contacto (solo se permite el método POST)
@app.route('/api/contact', methods=['POST'])
def receive_contact_message():
    if request.method == 'POST':
        try:
            nombre = request.form['nombre']
            apellido = request.form['apellido']
            email = request.form['email']
            mensaje = request.form['mensaje']
            bebida = request.form['bebida']

            new_message = ContactMessage(
                nombre=nombre,
                apellido=apellido,
                email=email,
                mensaje=mensaje,
                bebida=bebida
            )
            db.session.add(new_message)
            db.session.commit()

            return jsonify({'message': 'Mensaje recibido con éxito'}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Método no permitido'}), 405

# Ruta para registrar un nuevo usuario
@app.route('/api/register', methods=['POST'])
def register():
    if request.method == 'POST':
        try:
            username = request.json['username']
            email = request.json['email']
            password = request.json['password']

            if User.query.filter_by(username=username).first() is not None:
                return jsonify({'error': 'El nombre de usuario ya está en uso'}), 400

            if User.query.filter_by(email=email).first() is not None:
                return jsonify({'error': 'El correo electrónico ya está registrado'}), 400

            new_user = User(username=username, email=email)
            new_user.set_password(password)
            db.session.add(new_user)
            db.session.commit()

            return jsonify({'message': 'Usuario registrado exitosamente'}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Método no permitido'}), 405

# Ruta para iniciar sesión
@app.route('/api/login', methods=['POST'])
def login():
    if request.method == 'POST':
        try:
            username = request.json['username']
            password = request.json['password']

            # Búsqueda case-sensitive del usuario
            user = User.query.filter(User.username == username).first()

            if user is None or not user.check_password(password):
                return jsonify({'error': 'Credenciales inválidas'}), 401

            login_user(user)

            if current_user.is_authenticated:
                print(f"Usuario autenticado: {current_user.username}")

            return jsonify({'message': 'Login exitoso', 'username': user.username}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Método no permitido'}), 405

# Ruta para cerrar sesión
@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    try:
        if current_user.is_authenticated:
            print(f"Usuario actual: {current_user.username}")  # Mensaje de depuración
            logout_user()
            return jsonify({'message': 'Logout exitoso'}), 200
        else:
            return jsonify({'error': 'Usuario no autenticado'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener información del usuario actual
@app.route('/api/current_user', methods=['GET'])
def current_user_info():
    if current_user.is_authenticated:
        return jsonify({'username': current_user.username}), 200
    else:
        return jsonify({'username': None}), 401
    
# Ruta para obtener todas las reseñas
@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    try:
        reviews = Review.query.all()
        review_list = []
        for review in reviews:
            review_data = {
                'nombreUsuario': review.nombreUsuario,
                'comentario': review.comentario
            }
            review_list.append(review_data)
        return jsonify(review_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
