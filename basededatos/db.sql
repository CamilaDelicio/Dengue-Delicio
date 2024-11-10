CREATE  DATABASE nodecrud;
USE nodecrud;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    name varchar (255) NOT NULL,
    lastname varchar (255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SHOW TABLES;
DESCRIBE usuarios; 
USE nodecrud;
CREATE TABLE Paciente (
    nombre VARCHAR(155),
    apellido VARCHAR(155),
    dni INT PRIMARY KEY,
    direccion VARCHAR(155), 
    barrio VARCHAR(155),
    grupo VARCHAR(1),
    celular INT
); 
SHOW TABLES ;
DESCRIBE Paciente;
