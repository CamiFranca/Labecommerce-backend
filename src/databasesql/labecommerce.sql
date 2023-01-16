-- Active: 1673874689911@@127.0.0.1@3306
-- Criar tabela
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password UNIQUE NOT NULL
);
--verificar tabela
PRAGMA table_info ('users');

--deletar tabela
DROP TABLE users;

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT UNIQUE NOT NULL
);
--populando tabea
INSERT INTO users (id, email, password)
VALUES ('a01','cami@gmail.com','a01');

--verificar tabela
SELECT * FROM users;    

INSERT INTO users (ID,email,password)
VALUES('a02','fulano@gmail.com', 'a02'),
("a03", "ciclano@gmail.com","a03");

--tabela de produtos

CREATE TABLE products (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
name TEXT NOT NULL,
price REAL NOT NULL,
category TEXT NOT NULL);

SELECT * FROM products;

INSERT INTO products (id, name, price, category)
 VALUES("b01","shampoo",35.00, "higiene");

 INSERT INTO products (id, name, price, category)
 VALUES 
 ("b02", "condicionador", 40.00,"higiene");

 INSERT INTO products(id, name, price, category)
VALUES 
("b03", "sabonete", 6.80, "higiene");


INSERT INTO products (id, name, price, category)
 VALUES ("b04","agua", 1.20, "bebidas");

 INSERT INTO products (id, name, price, category)
  VALUES ("b05" "suco", 4.00, "bebidas");


