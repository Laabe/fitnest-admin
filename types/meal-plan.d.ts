export type MealType = "breakfast" | "lunch" | "dinner";

export interface MealPlan {
    id?: string,
    name: string,
    description: string,
    sku: string,
    image?: string,
    breakfast_price_per_day: number,
    lunch_price_per_day: number,
    dinner_price_per_day: number,
    snack_price_per_day: number,
    meals: {
        breakfast: string[],
        lunch: string[],
        dinner: string[],
    },
}
