
export enum Categoria {
    ELECTRONICS = "Eletrônicos",
    HIGIENE = "higiene",
    ALIMENTO = "alimento"
}

export type TUsers = {
    id: string,
    name:string,
    email: string,
    password: string,
    createdAt: string
}


export type TProducts = {
    id: string,
    name: string,
    description:string,
    imageUrl:string,
    price: number,
    category: string,
}

export type TPurchase = {
    id:string,
    total_price:number,
    paid:number,
    delivered_at:string,
    buyer_id:string
}


export type TNewProduct ={
    id : string,
    totalPrice: number,
    buyerId: string
    products: TProducts[]

   }