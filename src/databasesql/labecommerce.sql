-- Active: 1674065612185@@127.0.0.1@3306


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