export interface Courier {
    id: number,
    code: string,
    name: string | null,
    description: string,
    image: string,
    price: number,
    category: string,
    quantity: number,
    inventoryStatus: string,
    rating: number, 
}