-- Active: 1674065612185@@127.0.0.1@3306
-- Criar tabela

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password UNIQUE NOT NULL
    );

--verificar tabela

PRAGMA table_info ('users');

--deletar tabela

DROP TABLE users;


--populando tabea

INSERT INTO
    users (id, email, password)
VALUES ('a01', 'cami@gmail.com', 'a01');

--verificar tabela

SELECT * FROM users;

INSERT INTO
    users (ID, email, password)
VALUES
(
        'a02',
        'fulano@gmail.com',
        'a02'
    ), (
        "a03",
        "ciclano@gmail.com",
        "a03"
    );

--tabela de produtos

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

SELECT * FROM products;

INSERT INTO
    products (id, name, price, category)
VALUES
(
        "b01",
        "shampoo",
        35.00,
        "higiene"
    );

INSERT INTO
    products (id, name, price, category)
VALUES (
        "b02",
        "condicionador",
        40.00,
        "higiene"
    );

INSERT INTO
    products(id, name, price, category)
VALUES (
        "b03",
        "sabonete",
        6.80,
        "higiene"
    );

INSERT INTO
    products (id, name, price, category)
VALUES ("b04", "agua", 1.20, "bebidas");

--TA DANDO ERRO

INSERT INTO
    products (id, name, price, category)
VALUES ("b05", "suco", 4.00, "bebidas");

-- exercicio aula 09

SELECT * FROM products WHERE name = "shampoo";

INSERT INTO
    products (id, name, price, category)
VALUES (
        'b06',
        'granola',
        7.50,
        'alimento'
    );

INSERT INTO
    users (id, email, password)
VALUES (
        'a05',
        'pessoa@pessoa.com',
        'a05'
    ), (
        'a04',
        "maricota@gmail.com",
        'a04'
    ), ("a06", 'eno@gmail.com', 'a06');

SELECT * FROM products WHERE id = 'b02';

DELETE FROM users WHERE id = "b04";

DELETE FROM products WHERE id = "a02";

UPDATE users SET password = 'AB01' WHERE id= 'a01';

UPDATE products SET price = 10.0 WHERE id = "b01";

SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 1;

SELECT * FROM products WHERE price > 2.0 AND price <10.0;
--x--

CREATE TABLE
    purchases(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL UNIQUE NOT NULL,
        paid INTEGER NOT NULL,
        delivered_at TEXT,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users(id)
    );

SELECT * FROM purchases;


INSERT INTO
    purchases (
        id,
        total_price,
        paid,
        delivered_at,
        buyer_id
    )
VALUES ('p01', 40.00, 0, NULL,'a01'), 
('p02', 22.00,0, NULL ,'a01'), 
('p03', 20.00, 0, NULL,'a02'), 
('p04', 63.00, 0, NULL,'a02');

DROP TABLE purchases;

SELECT * FROM users;

SELECT * FROM products;
SELECT * FROM purchases;

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = 'p02';

SELECT * FROM users
INNER JOIN purchases
ON buyer_id = users.id
WHERE users.id = "a01";
---x---
CREATE TABLE purchases_products
(purchase_id TEXT NOT NULL,
product_id TEXT NOT NULL,
quantity INTEGER NOT NULL);

INSERT INTO purchases_products (purchase_id,product_id, quantity)
VALUES ( "b03","p01", 5),
( "b01","p02", 3),
( "b02","p03",2),
("b04","p04", 6);

SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.product_id = purchases.id
INNER JOIN products
ON purchases_products.purchase_id = products.id;

DROP TABLE purchases_products;