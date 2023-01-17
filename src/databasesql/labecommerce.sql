-- Active: 1673908406077@@127.0.0.1@3306
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
VALUES ("b03", "sabonete", 6.80, "higiene");


INSERT INTO products (id, name, price, category)
 VALUES ("b04","agua", 1.20, "bebidas");

--TA DANDO ERRO
 INSERT INTO products (id, name, price, category)
  VALUES ("b05", "suco", 4.00, "bebidas");

-- exercicio aula 09

SELECT * FROM products
WHERE name = "shampoo";

INSERT INTO products (id, name, price, category)
VALUES ('b06', 'granola', 7.50, 'alimento');

INSERT INTO users (id,email,password)
VALUES ('a05', 'pessoa@pessoa.com', 'a05');

SELECT * FROM products
WHERE id = 'b02';

DELETE FROM users
WHERE id = "b04";


DELETE FROM products
WHERE id = "a02";

UPDATE users
SET  password  = 'AB01'
WHERE id= 'a01';

UPDATE products
SET price = 10.0
WHERE id = "b01";

SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 1;

SELECT * FROM products
WHERE price > 2.0 AND price <10.0;

