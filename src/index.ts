import { getParsedCommandLineOfConfigFile } from "typescript";
import { users, products, purchases } from "./database";
import { TUsers, TProducts, TPurchase, Categoria, } from "./types"
import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './databasesql/knex'


const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {

    res.send('pong')
})


app.get("/users", async (req: Request, res: Response) => {

    try {

        const result = await db("users")

        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.get("/products", async (req: Request, res: Response) => {

    try {
        const result = await db("products")

        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

    }
})

app.get('/products/search', async (req: Request, res: Response) => {
    try {

        const name = req.query.name

        const result = await db("products").where("name", "LIKE", `%${name}%`)

        if (result.length < 1) {
            res.status(400)
            throw new Error("A query precisa de um parâmetro ")
        }
        res.status(200).send(result)

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, name, email, password, createdAt } = req.body as TUsers

        const newUser: TUsers = {
            id,
            name,
            email,
            password,
            createdAt
        }

        if (id !== undefined) {

            if (typeof id !== 'string') {
                res.status(400)
                throw new Error('o id deve ser tipo string')
            }

            if (id.length <= 0) {
                res.status(400)
                throw new Error('o Id deve ter pelo menos um valor')
            }
            if (id[0] !== "0") {
                res.status(400)
                throw new Error('o Id deve começar com zero')
            }
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error('o id deve ser tipo string')
            }
            if (id.length <= 0) {
                res.status(400)
                throw new Error('Você precisa digitar um nome')
            }
        }
        if (email !== undefined) {
            if (typeof email !== 'string') {
                res.status(400)
                throw new Error('o e-mail deve ser tipo string')
            }

            if (email.length <= 0) {
                res.status(400)
                throw new Error('o e-mail deve ter pelo menos um valor')
            }

            if (!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
                res.status(400)
                throw new Error("O email precisa seguir esse modelo: 'example@example.com'")
            }
        }
        if (password !== undefined) {
            if (typeof password !== 'string') {
                res.status(400)
                throw new Error('o password deve ser tipo number')
            }

            if (password.length < 6) {
                res.status(400)
                throw new Error('o password deve ter pelo menos 6 caracteres')
            }
        }


        await db("users").insert(newUser)
        res.status(200).send("Usuário criado com sucesso")

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {

            res.status(500)
        }
        res.send(error.message)

    }
})

app.post("/product", async (req: Request, res: Response) => {

    try {
        const { id, name, description, imageUrl, price, category } = req.body as TProducts

        const newProduct: TProducts = {
            id,
            name,
            description,
            imageUrl,
            price,
            category
        }
        if (id !== undefined) {

            if (typeof id !== 'string') {
                res.status(400)
                throw new Error('o id deve ser tipo string')
            }

            if (id.length <= 0) {
                res.status(400)
                throw new Error('o Id deve ter pelo menos um valor')
            }
            if (id[0] !== "0") {
                res.status(400)
                throw new Error('o Id deve começar com zero')
            }
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error('o nome deve ser tipo string')
            }
            if (name.length <= 0) {
                res.status(400)
                throw new Error('Você precisa digitar um nome')
            }
        }
        if (description !== undefined) {
            if (typeof description !== "string") {
                res.status(400)
                throw new Error('a descrição deve ser tipo string')
            }
            if (description.length <= 0) {
                res.status(400)
                throw new Error('Você precisa digitar uma descrição')
            }
        }
        if (imageUrl !== undefined) {
            if (typeof imageUrl !== "string") {
                res.status(400)
                throw new Error('a url deve ser tipo string')
            }
            if (imageUrl.length <= 0) {
                res.status(400)
                throw new Error('Você precisa digitar uma url')
            }
            if (imageUrl[0] !== "h") {
                res.status(400)
                throw new Error("O endereço precisar ser um http")
            }

        }
        if (price !== undefined) {

            if (typeof price !== "number") {
                res.status(400)
                throw new Error('o preço deve ser tipo number')

            }
        }
        if (category !== undefined) {

            if (typeof category !== 'string') {
                res.status(400)
                throw new Error('a category deve ser tipo string')
            }

            if (category.length <= 0) {
                res.status(400)
                throw new Error('você precisa preencher o campo category')

            }
        }


        await db("products").insert(newProduct)

        res.status(201).send({ message: "Produto cadastrado com sucesso!" })

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.put("/products/:id", async (req: Request, res: Response) => {
    try {

        const paramsId = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newDescription = req.body.description
        const newImageUrl = req.body.imageUrl
        const newPrice = req.body.price
        const newCategory = req.body.category


        if (newId !== undefined) {

            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("O id precisa ser uma string")
            }

        }
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("O nname precisa ser uma string")
            }

        }
        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("O preço precisa ser um número")
            }

        }
        if (newCategory) {
            if (newCategory !== Categoria.ELECTRONICS &&
                newCategory !== Categoria.HIGIENE &&
                newCategory !== Categoria.ALIMENTO) {
                res.status(400)
                throw new Error("A categoria precisa ser uma dessas opções: eletronics, higiene ou alimento")
            }
        }

        const [productExist] = await db("products").where({ id: paramsId })

        if (!productExist) {
            res.status(404)
            throw new Error("id não encontrado")
        }

        const changedProduct = {

            id: newId || productExist.id,
            name: newName || productExist.name,
            description: newDescription || productExist.description,
            imageUrl: newImageUrl || productExist.imageUrl,
            price: isNaN(newPrice) ? productExist.price : newPrice,
            category: newCategory || productExist.category
        }

        await db("products").update(changedProduct).where({ id: paramsId })

        res.status(201).send({ message: "Produto atualizado com sucesso!" })

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
 
app.post("/purchases", async (req: Request, res: Response) => {

    try {

        const { id,
            totalPrice,
            buyerId,
            products
        } = req.body

        const newPurchase = {
            id: id,
            total_price: totalPrice,
            paid: 0,
            buyer_id: buyerId
        }

        if (id !== undefined) {

            if (typeof id !== 'string') {
                res.status(400)
                throw new Error('o id deve ser tipo string')
            }

            if (id.length <= 0) {
                res.status(400)
                throw new Error('o Id deve ter pelo menos um valor')
            }
            if (id[0] !== "0") {
                res.status(400)
                throw new Error('o Id deve começar com zero')
            }
        }
        if (buyerId !== undefined) {
            if (typeof buyerId !== "string") {
                res.status(400)
                throw new Error('o buyerId deve ser tipo string')
            }
            if (buyerId.length <= 0) {
                res.status(400)
                throw new Error('Você precisa digitar um valor na propriedade BuyerId')
            }
            if (buyerId[0] !== "u") {
                res.status(400)
                throw new Error('o buyerId deve começar com a letra u')
            }
        }
        for (let i = 0; i < products.length; i++) {
            const [validateProduct]  = await db("products").where({ id: products[i].id })

            if(typeof products[i].id === "undefined"){
                res.status(400)
                throw new Error("products é um array de objeto(s)");

            }
            if (!validateProduct) {
                res.status(404)
                throw new Error("Produto não encontrado");
            }
            if (typeof products[i].id !== "string") {
                res.status(400)
                throw new Error("produto id precisa ser uma string");
            }
            if (typeof products[i].quantity !== "number" || products[i].quantity <= 0) {
                res.status(400)
                throw new Error("A compra precisa de um valor maior que 0");

            }

        }
       
        await db("purchases").insert(newPurchase)

        for (let i in products) {
            const newProductPurchase = {
                purchase_id: id,
                product_id: products[i].produtoId,
                quantity: products[i].quantity
            }
            console.log(newProductPurchase)

            await db("purchases_products").insert(newProductPurchase)

        }


        res.status(200).send({ messege: 'Pedido realizado com sucesso' })


    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

    }

})
app.delete("/purchases/:id", async (req: Request, res: Response) => {

    try {
        const id = req.params.id

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("O id da purchase precisa ser uma string")
        }
        if (id[0] !== "p") {
            res.send(400)
            throw new Error("O id da purchase precisa começar com 'p'")
        }

        await db("purchases_products").del().where({ purchase_id: id })
        await db("purchases").del().where({ id: id })

        res.status(200).send({ message: "Pedido cancelado com sucesso" })

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

    }


})

app.get("/purchases/:id", async (req: Request, res: Response) => {

    try {

        const id = req.params.id

        const [buy]: TPurchase[] | undefined[] = await db("purchases").where({ id: id })

        if (buy) {
            const [buy] = await db("purchases")
                .select(
                    "purchases.id AS purchaseId",
                    "users.id AS buyerId",
                    "users.name AS buyerName",
                    "users.email AS buyerEmail ",
                    "purchases.total_price AS totalPrice",
                    "purchases.create_at AS createdAt",
                    "purchases.paid AS paid",
                    "purchases.delivered_at AS deliveredAt"

                )
                .innerJoin("users", "purchases.buyer_id", "=", "users.id")
                .where({ "purchases.id": id })
        }

        const productList = await db("products")
            .select(
                "products.id AS id",
                "products.name AS name",
                "products.price AS price",
                "products.description AS description",
                "products.imageUrl",
                "purchases_products.quantity"

            )
            .innerJoin("products", "purchases_products.product_id", "=", "products_id")
            .where({ "products.id": id })

        const result = ({ ...buy, products: productList })
        res.status(200).send(result)

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }


})