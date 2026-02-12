import Datetime from "zod/src/v3/benchmarks/datetime";

type status = 'active' | 'draft' | 'archived';

type Price = {
    base: number,
    discount?: number,
}

type Category = {
    id: string,
    name: string,
}

type Variant = {
    option: string,
    value: string,
    price: number
}

export interface Product {
    id: string,
    name: string,
    description: string,
    sku: string,
    price: Price,
    stock_quantity: number,
    category: Category,
    variants?: Variant[],
    status: status,
    images?: string[],
    created_at: Datetime
}

export interface ProductPayload {
    id?: string,
    name: string,
    description: string,
    sku: string,
    price: Price,
    stock_quantity: number,
    category_id: string,
    variants?: Variant[],
    status: status,
    images?: string[],
}