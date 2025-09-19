export interface Meal {
    included: boolean;
    price: number;
    recipes: string[]; // UUIDs
}

interface BillingPeriod {
    weekly: boolean,
    monthly: boolean,
}

interface Snacks {
    included: boolean,
    price: number,
}

export interface MealPlan {
    id?: string,
    name: string,
    description: string,
    photo?: File | null,
    snacks: Snacks,
    billingPeriod: BillingPeriod,
    meals: {
        breakfast: Meal,
        lunch: Meal,
        dinner: Meal,
    },
}
