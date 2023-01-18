<<<<<<< HEAD
-- Active: 1674065226078@@127.0.0.1@3306


CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
   buyer_id TEXT NOT NULL,
   FOREIGN KEY (buyer_id) REFERENCES users(id)
   );
SELECT * FROM purchases;
-- A coluna paid será utilizada para guardar uma lógica booleana. O SQLite recomenda o uso do número 0 para false e 1 para true.
-- Os pedidos começam com paid valendo 0 (você irá definir isso quando for popular a tabela com o INSERT).

-- A coluna delivered_at será utilizada para gerenciar a data de entrega do pedido. Ela é opcional, porque sempre começará sem valor ao criar um pedido, ou seja, null.
-- O SQLite recomenda utilizar TEXT para lidar com strings no formato ISO8601 "aaaa-mm-dd hh:mm:sss". Lembre-se da existência da função nativa DATETIME para gerar datas nesse formato.
-- Popule sua tabela de pedidos, criada no exercício anterior.
-- Por enquanto não se preocupe em adicionar produtos ao pedido, veremos isso na aula que vem.
-- Com isso em mente, crie um valor aleatório para o preço total do pedido.

-- a) Crie dois pedidos para cada usuário cadastrado
-- No mínimo 4 no total (ou seja, pelo menos 2 usuários diferentes) e devem iniciar com a data de entrega nula.

-- b) Edite o status da data de entrega de um pedido
-- Simule que o pedido foi entregue no exato momento da sua edição (ou seja, data atual).

INSERT INTO purchases (id, total_price, paid, delivered_at ,buyer_id)
VALUES ( 'p01', 40.00, 0, NULL, 'a001');

INSERT INTO purchases (id, total_price, paid, delivered_at ,buyer_id)
VALUES ( 'p02', 22.00, 0, NULL, 'a001'),
('p03', 20.00, 0, NULL, 'a002'),
('p04', 63.00, 0, NULL, 'a002');

SELECT * FROM products;
=======

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


>>>>>>> 76a5f6919998fe2b0b87edee6231ed33b5c85105
