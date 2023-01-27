import { TUsers } from "./types"
import { TProducts } from "./types"
import { TPurchase } from "./types"
import { Categoria } from "./types"


export const users: TUsers[] = [  //porque é um array de objetos
    {
        id: 'fulano',
        name:"Fulano",
        email: 'fulano@gmail.com',
        password: 'abc',
        createdAt:"http..."

    },

    {
        id: 'ciclano',
        name:"ciclano",
        email: 'ciclano@gmail.com',
        password: 'def',
        createdAt: "http..."

    }

]



export const products: TProducts[] = [
    {
        id: '01',
        name: 'shampoo',
        description:"L'oreal",
        imageUrl:"http...",
        price: 6.00,
        category: Categoria.HIGIENE,
    },
    {
        id: '02',
        name: 'condicionador',
        description:"L'oreal",
        imageUrl:"http...",
        price: 8.00,
        category: Categoria.HIGIENE,
    }
]



export const purchases: TPurchase[] = [
    {
        userId: 'fulano',
        productId: '01',
        quantity: 2,
        totalPrice: 8 * 2,
    },

    {
        userId: 'ciclano',
        productId: '02',
        quantity: 1,
        totalPrice: 6 * 1,
    }
]



export const createUser = (id: string,name:string, email: string, password: string, createdAt:string): string => {
    const newUser: TUsers = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt:createdAt
    }
    users.push(newUser)
    return 'Cadastro realizado com sucesso'
}

export const getAllUsers = (): TUsers[] => {
    return users
}

export const createProduct = (id: string, name: string, description:string, imageUrl:string, price: number, category: string): string => {
    const newProduct = {
        id: id,
        name: name,
        description,
        imageUrl,
        price: price,
        category: category,
    }
    products.push(newProduct)
    return "Produto criado com sucesso"
}
export const getAllProducts = (): TProducts[] => {
    return products
}


export const getProductById =(idToSearch: string): TProducts[] | undefined =>{
   return products.filter((products)=>{
        if(products.id === idToSearch){
            return products
        }
    })
}
