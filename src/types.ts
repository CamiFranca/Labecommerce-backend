
export enum Categoria {
    ELECTRONICS = "Eletrônicos",
    HIGIENE = "higiene",
    ALIMENTO = "alimento"
}

export type TUsers = {
    id: string,
    email: string,
    password: string,
}


export type TProducts = {
    id: string,
    name: string,
    price: number,
    category: string,
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number,
}