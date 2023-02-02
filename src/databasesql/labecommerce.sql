-- Active: 1675094188763@@127.0.0.1@3306
-- Criar tabela

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password UNIQUE NOT NULL,
        createdAt TEXT NOT NULL
    );
 

INSERT INTO
    users (id, name, email, password, createdAt)
VALUES
(       'u01',
        'Camilla',
        'cami@gmail.com',
        'a01', 
        "26/01/2023"
  ),(
        'u02',
        'fulano',
        'fulano@gmail.com',
        'a02',
        "26/01/2023"
    ), (
        "u03",
        'ciclano',
        "ciclano@gmail.com",
        "a03",
        "26/01/2023"
    ),
     (
        'u04',
        "maricota@gmail.com",
        'maricota',
        'a04',
        "26/01/2023"
    ),
     (
        'u05',
        'pessoa',
        'pessoa@pessoa.com',
        'a05',
        "26/01/2023"
    ), (
        "u06",
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


INSERT INTO
    products (id, name, description, imageUrl, price, category)
VALUES
(
        "p01",
        "shampoo",
        "L'oreal",
        "https...",
        35.00,
        "higiene"

    ),
    (
        "p02",
        "condicionador",
        "L'oreal",
        "https...",
        40.00,
        "higiene"
    ),
    (
        "p03",
        "sabonete",
        "L'oreal",
        "https...",
        6.80,
        "higiene"
    ),
    (   "p04",
        "suco",
        "caixinha",
        "https...",
        4.00, 
        "bebidas"
    ),(
        'p05',
        'granola',
        "saquinho",
        "https...",
        7.50,
        'alimento'
    );
SELECT * FROM purchases;
CREATE TABLE
    purchases(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL UNIQUE NOT NULL,
        paid INTEGER  DEFAULT (0) NOT NULL,
        create_at TEXT DEFAULT(DATETIME()) NOT NULL,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users(id) 
    );

INSERT INTO
    purchases (
        id,
        total_price,
        buyer_id
    )
VALUES 
('pr01', 40.00, 'u01'), 
('pr02', 22.00, 'u01'), 
('pr03', 20.00, 'u02'), 
('pr04', 63.00, 'u02');

SELECT * FROM purchases;
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
"pr03","p01", 5),
("pr01","p02", 3),
("pr02","p03",2),
("pr04","p04", 6);

SELECT * FROM purchases_products;
INNER JOIN purchases
ON purchases_products.product_id = purchases.id
INNER JOIN products
ON purchases_products.purchase_id = products.id;

DROP TABLE purchases_products;
SELECT * FROM products;