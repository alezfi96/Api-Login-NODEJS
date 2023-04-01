CREATE DATABASE IF NOT EXISTS  login_node_jwt ;

USE DATABASE login_node_jwt;

CREATE TABLE  usuarios1(
    id INT(11) NOT NULL AUTO_INCREMENT ,
    user VARCHAR(50) NOT NULL,
    nombre VARCHAR (45) NOT  NULL,
    pass VARCHAR (200) NOT NULL,
    PRIMARY KEY (id)
    
);
DESCRIBE usuarios;
/*

INSERT INTO clientes VALUES 
(1,'ferney figueroa','popayan','aprendiz'),
(2,'pablo ortiz','pasto','instructor'),
(3,'thiago alexander','popayan','bebe');