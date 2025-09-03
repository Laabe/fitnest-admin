interface Meal {
    type: "breakfast" | "lunch" | "dinner"; // extend if more
    price: number;
    recipes: string[]; // UUIDs
}

export interface MealPlan {
    id?: string,
    name: string,
    description?: string,
    photo?: string,
    withSnacks: boolean,
    snackPrice?: number,
    period: 'weekly' | 'monthly',
    meals: Meal[],
}
