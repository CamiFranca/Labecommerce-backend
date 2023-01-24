import { getParsedCommandLineOfConfigFile } from "typescript";
import { users, products, purchases } from "./database";
import {
    createUser,
    getAllUsers,
    createProduct,
    getAllProducts,
    getProductById
} from "./database"
import { TUsers, TProducts, TPurchase, Categoria } from "./types"
import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './databasesql/knex'


const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//Aula 02
console.log('USERS', users)
console.log('PRODUCT', products)
console.log('PURCHASES', purchases)
//Aula 03
console.table(createUser('cami',"Camilla", 'cami@gmail.com',"http...", '123456'))
console.log(getAllUsers())
console.log(createProduct('03', 'TV',"LG","http...",3.200, 'eletronico'))
console.log(getAllProducts())
console.log(getProductById('03'))

//Aula 05

app.get('/ping', (req: Request, res: Response) => {

    res.send('pong')
})

//----------------------------------Aula 12---------------------------------
app.get("/users", async (req: Request, res: Response) => {

    try {
        const result = await db.raw(`SELECT * FROM users`)

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
//----------------------------------Aula 12---------------------------------


app.get("/products", async (req: Request, res: Response) => {

    try {
        const result = await db.raw(`SELECT * FROM products`)
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
//---------------------------------aula 12 --------------------------------

app.get('/products/search', async (req: Request, res: Response) => {
    try {

        const name = req.query.name
        const result = await db.raw(`SELECT * FROM products
                                    WHERE name = "${name}"`)
        if(result.length <1){
            res.status(400)
            throw new Error ("A query precisa de um parâmetro ")
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
//---------------------------------aula 12 --------------------------------

app.post("/users", async(req: Request, res: Response) => {
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
        if (email !== undefined) {
            if (typeof email !== 'string') {
                res.status(400)
                throw new Error('o e-mail deve ser tipo string')
            }

            if (email.length <= 0) {
                res.status(400)
                throw new Error('o e-mail deve ter pelo menos um valor')
            }

            if (!email.includes('@')) {
                res.status(400)
                throw new Error('um e-mail deve ter o "@"')
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
        const userId = users.filter((user) => user.id === id)

        if (userId.length >= 1) {
            res.status(422)
            throw new Error('essa id já está cadastrada')
        }

        const userEmail = users.filter((user) => user.email === email)

        if (userEmail.length >= 1) {
            res.status(422)
            throw new Error('É preciso enviar um e-mail')
        }
        await db.raw(`
        INSERT INTO users (id, name, email, password, createdAt)
        VALUES ("${id}", "${email}", "${name}","${password}","${createdAt}");
        
        `)
        users.push(newUser)
        res.status(200).send("Usuário criado com sucesso")

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {

            res.status(500)
        }
        res.send(error.message)

    }
})
//-------------------------------------aula12 --------------------------------------
app.post("product", async(req: Request, res: Response)=>{

   try {
    const { id, name, description, imageUrl, price, category } = req.body as TProducts
    const newProduct : TProducts = { 
     id,
     name,
     description,
     imageUrl,
     price,
     category
    }
    if()
   } catch (error) {
    
   }
})
//--------------------------Aula 6--criar compra-----------------------------------
app.post("/purchases", (req: Request, res: Response) => {
    const { userId,
        productId,
        quantity,
        totalPrice } = req.body as TPurchase

    const newpurchase = {
        userId,
        productId,
        quantity,
        totalPrice,
    }

    purchases.push(newpurchase)
    res.status(200).send(newpurchase)
})
//----------------------pegar compra-----Aula 7-------------------------------
app.get("/users/:id/purchases", (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const result = products.find((product) => {
            return product.id === id
        })
        if (result === undefined) {
            res.status(400)
            throw new Error('o id da compra não existe')
        }
        res.status(200).send(result)

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})
//-----------------------------aula 7----deletar produto----------------------------------
app.delete("/products/:id", (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const productIndex = products.findIndex((product) => {
            return product.id === id
        })


        if (productIndex === -1) {
            res.status(400)
            throw new Error('o id do produto não existe')
        }

        products.splice(productIndex, 1)
        res.status(200).send('O produto foi apagado com sucesso.')


    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {

            res.status(500)
        }
        res.send(error.message)
    }
})
//---------------------------deletar usuario---aula 7-----------------------------
app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const userIndex = users.findIndex((user) => {
            return user.id === id
        })

        if (userIndex < -1) {
            res.status(400)
            throw new Error('o usuário do produto não existe')
        }

        users.splice(userIndex, 1)
        res.status(200).send('usuário apagado com sucesso')

    } catch (error) {

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//------------------------aula 7--mudar produto------------------------------
app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newCategory = req.body.category

        const product = products.find((product) => {
            return product.id === id
        })
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
                throw new Error("A categoria precisa ser eletrônicos")
            }
        }
        if (!product) {
            res.status(400)
            throw new Error("Produto não cadastrado")
        }
        if (product) {
            product.id = newId || product.id
            product.name = newName || product.name
            product.price = isNaN(newPrice) ? product.price : newPrice
            product.category = newCategory || product.category
        }

        res.status(200).send("item alterado com sucesso")
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//-----------------------Aula 7 modificar usuário----------------------------
app.put("/users/:id", (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const newId = req.body.id as string | undefined
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const user = users.find((user) => {
            return user.id === id
        })
        if (newId !== undefined) {

            if (typeof newId !== 'string') {
                res.status(400)
                throw new Error("O id precisa ser uma string")
            }
        }

        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                res.status(400)
                throw new Error("O email precisa ser uma string")
            }

        }
        if (newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                res.status(400)
                throw new Error("A senha precisa ser uma string")
            }

        }
        if (!user) {
            res.status(400)
            throw new Error("usuário não cadastrado")
        }
        if (user) {
            user.id === newId || user.id
            user.email = newEmail || user.email
            user.password = newPassword || user.password
        }
        res.status(200).send("produto alterado co sucesso")

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})