-- Iniciar sesión en MySQL como root
-- mysql -u root -p

DROP DATABASE IF EXISTS wunderbar;

CREATE DATABASE wunderbar;

-- Si el usuario no existe, crearlo
-- CREATE USER IF NOT EXISTS 'usuario-test'@'localhost' IDENTIFIED BY '1234';

-- Otorgar privilegios si el usuario fue creado
-- GRANT ALL PRIVILEGES ON wunderbar.* TO 'usuario-test'@'localhost' WITH GRANT OPTION;

-- FLUSH PRIVILEGES;

USE wunderbar;

CREATE TABLE IF NOT EXISTS promos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    precio VARCHAR(500) NOT NULL
);

-- select * from promos

CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    bebida VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- select * from contact_messages

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- select * from users

-- Crear la tabla reviews
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(255) NOT NULL,
    comentario TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);