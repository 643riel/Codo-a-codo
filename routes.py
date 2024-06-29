from flask import Blueprint, jsonify, request
from models import db, Promo, ContactMessage, User, Review
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

# Crear un Blueprint para las rutas
routes = Blueprint('routes', __name__)

# Ruta para obtener todas las promos
@routes.route('/api/promos', methods=['GET'])
def get_promos():
    try:
        promos = Promo.query.all()
        promo_list = []
        for promo in promos:
            promo_data = {
                'id': promo.id,
                'descripcion': promo.descripcion,
                'imageUrl': promo.imageUrl,
                'precio': promo.precio
            }
            promo_list.append(promo_data)
        return jsonify(promo_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@routes.route('/api/promos', methods=['POST'])
def add_promo():
    try:
        descripcion = request.json.get('descripcion')
        imageUrl = request.json.get('imageUrl')
        precio = request.json.get('precio')

        new_promo = Promo(descripcion=descripcion, imageUrl=imageUrl, precio=precio)
        db.session.add(new_promo)
        db.session.commit()

        return jsonify({'message': 'Promo agregada correctamente', 'id': new_promo.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@routes.route('/api/promos/<int:id>', methods=['DELETE'])
def delete_promo(id):
    try:
        promo = Promo.query.get_or_404(id)
        db.session.delete(promo)
        db.session.commit()
        return jsonify({'message': 'Promo eliminada correctamente'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

@routes.route('/api/promos/<int:id>', methods=['PUT'])
def update_promo(id):
    try:
        promo = Promo.query.get_or_404(id)
        descripcion = request.json.get('descripcion')
        imageUrl = request.json.get('imageUrl')
        precio = request.json.get('precio')

        promo.descripcion = descripcion
        promo.imageUrl = imageUrl
        promo.precio = precio

        db.session.commit()
        return jsonify({'message': 'Promo actualizada correctamente'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# -----------------------------------------------------------
# --- CONTACT MESSAGES

# Ruta para recibir un mensaje de contacto
@routes.route('/api/contact', methods=['POST'])
def receive_contact_message():
    try:
        data = request.form
        new_message = ContactMessage(
            nombre=data['nombre'],
            apellido=data['apellido'],
            email=data['email'],
            mensaje=data['mensaje'],
            bebida=data['bebida']
        )
        db.session.add(new_message)
        db.session.commit()
        return jsonify({'message': 'Mensaje recibido con éxito'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Ruta para obtener todos los mensajes de contacto
@routes.route('/api/contact_messages', methods=['GET'])
def get_contact_messages():
    try:
        messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
        return jsonify([message.to_dict() for message in messages]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para eliminar un mensaje de contacto
@routes.route('/api/contact_messages/<int:message_id>', methods=['DELETE'])
def delete_contact_message(message_id):
    try:
        message = ContactMessage.query.get(message_id)
        if not message:
            return jsonify({'error': 'Mensaje de contacto no encontrado'}), 404

        db.session.delete(message)
        db.session.commit()
        return jsonify({'message': 'Mensaje de contacto eliminado correctamente'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


#------------------------------------------------------------

# Ruta para registrar un nuevo usuario
@routes.route('/api/register', methods=['POST'])
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
@routes.route('/api/login', methods=['POST'])
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
@routes.route('/api/logout', methods=['POST'])
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
@routes.route('/api/current_user', methods=['GET'])
def current_user_info():
    if current_user.is_authenticated:
        print(f"Usuario autenticado: {current_user.username}")  # Agregar este log
        return jsonify({'username': current_user.username}), 200
    else:
        print("Usuario no autenticado")  # Agregar este log
        return jsonify({'username': None}), 401

# Ruta para obtener todas las reseñas
@routes.route('/api/reviews', methods=['GET'])
def get_reviews():
    try:
        reviews = Review.query.all()
        review_list = []
        for review in reviews:
            review_data = {
                'id': review.id,  # Agregar el campo ID
                'nombreUsuario': review.nombreUsuario,
                'comentario': review.comentario
            }
            review_list.append(review_data)
        return jsonify(review_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# Ruta para crear una nueva reseña
@routes.route('/api/reviews', methods=['POST'])
def create_review():
    if request.method == 'POST':
        try:
            data = request.get_json()
            nombreUsuario = data['nombreUsuario']
            comentario = data['comentario']

            new_review = Review(nombreUsuario=nombreUsuario, comentario=comentario)
            db.session.add(new_review)
            db.session.commit()

            return jsonify({'nombreUsuario': nombreUsuario, 'comentario': comentario}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Método no permitido'}), 405
    
@routes.route('/api/reviews/<int:id>', methods=['DELETE'])
def delete_review(id):
    if request.method == 'DELETE':
        try:
            review = Review.query.get(id)
            if not review:
                return jsonify({'error': 'Reseña no encontrada'}), 404

            db.session.delete(review)
            db.session.commit()

            return jsonify({'message': 'Reseña eliminada correctamente'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Método no permitido'}), 405
    
@routes.route('/api/reviews/<int:id>', methods=['PUT'])
def update_review(id):
    if request.method == 'PUT':
        try:
            data = request.get_json()
            nombreUsuario = data['nombreUsuario']
            comentario = data['comentario']

            review = Review.query.get(id)
            if not review:
                return jsonify({'error': 'Reseña no encontrada'}), 404

            review.nombreUsuario = nombreUsuario
            review.comentario = comentario
            db.session.commit()

            return jsonify({'message': 'Reseña actualizada correctamente'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Método no permitido'}), 405

