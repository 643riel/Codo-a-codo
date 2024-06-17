from flask import Flask
from flask_cors import CORS  # Importar CORS desde flask_cors
from models import db, User
from routes import routes
from flask_login import LoginManager

# Configurar la aplicación Flask
app = Flask(__name__)

# Configurar la conexión a la base de datos MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://usuario-test:1234@localhost:3306/wunderbar'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # Clave secreta para Flask-Login
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

# Inicializar la base de datos
db.init_app(app)

# Configurar Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

# Definir el método para cargar usuarios
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Registrar las rutas
app.register_blueprint(routes)

# Configurar CORS para permitir todas las solicitudes y credenciales
CORS(app, supports_credentials=True)

if __name__ == '__main__':
    app.run(debug=True)
