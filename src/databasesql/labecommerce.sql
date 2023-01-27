-- Active: 1674065612185@@127.0.0.1@3306
-- Criar tabela

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password UNIQUE NOT NULL,
        createdAt TEXT NOT NULL
    );
 



PRAGMA table_info ('users');

INSERT INTO
    users (id, name, email, password, createdAt)
VALUES
(       'a01',
        'Camilla',
        'cami@gmail.com',
        'a01', 
        "26/01/2023"
  ),(
        'a02',
        'fulano',
        'fulano@gmail.com',
        'a02',
        "26/01/2023"
    ), (
        "a03",
        'ciclano',
        "ciclano@gmail.com",
        "a03",
        "26/01/2023"
    ),
     (
        'a05',
        'pessoa',
        'pessoa@pessoa.com',
        'a05',
        "26/01/2023"
    ), (
        'a04',
        "maricota@gmail.com",
        'maricota',
        'a04',
        "26/01/2023"
    ), (
        "a06",
        'Enno',
        'enno@gmail.com',
        'a06',
        "26/01/2023"
    );



CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

SELECT * FROM products;
INSERT INTO
    products (id, name, description, imageUrl, price, category)
VALUES
(
        "b01",
        "shampoo",
        "L'oreal",
        "https://picsum.photos/id/shampoo/400",
        35.00,
        "higiene"

    ),
    (
        "b02",
        "condicionador",
        "L'oreal",
        "https://picsum.photos/id/condicionador/400",
        40.00,
        "higiene"
    ),
    (
        "b03",
        "sabonete",
        "L'oreal",
        "https://picsum.photos/id/condicionador/400",
        6.80,
        "higiene"
    ),
    (   "b05",
        "suco",
        "caixinha",
        "https://picsum.photos/id/suco/400",
        4.00, 
        "bebidas"
    ),(
        'b06',
        'granola',
        "saquinho",
        "https://picsum.photos/id/granola/400",
        7.50,
        'alimento'
    );

CREATE TABLE
    purchases(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL UNIQUE NOT NULL,
        paid INTEGER NOT NULL,
        delivered_at TEXT,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users(id) --Referencia outra tabela
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
VALUES 
('p01', 40.00, 0, NULL,'a01'), 
('p02', 22.00, 0, NULL,'a01'), 
('p03', 20.00, 0, NULL,'a02'), 
('p04', 63.00, 0, NULL,'a02');


UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = 'p02';
DROP TABLE purchases;


SELECT * FROM users
INNER JOIN purchases
ON buyer_id = users.id
WHERE users.id = "a01";

CREATE TABLE purchases_products(
purchase_id TEXT NOT NULL,
product_id TEXT NOT NULL,
quantity INTEGER NOT NULL);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES ( 
"b03","p01", 5),
("b01","p02", 3),
("b02","p03",2),
("b04","p04", 6);

--Mostra a relação das três tabelas, interessante p ver qual é o produto e quantos dele foi comprado
SELECT * FROM purchases;
INNER JOIN purchases
ON purchases_products.product_id = purchases.id
INNER JOIN products
ON purchases_products.purchase_id = products.id;

DROP TABLE purchases_products;