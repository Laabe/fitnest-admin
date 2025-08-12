type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

type Meal = {
    id: string,
    name: string,
    description: string,
    calories: number,
    protein: number,
    carbohydrates: number,
    fats: number,
    image: string,
    meal_type: MealType,
}