export interface Meal {
    id?: string,
    name: string,
    description: string,
    sku: string,
    calories: number,
    protein: number,
    carbohydrates: number,
    fats: number,
    image?: string,
}
