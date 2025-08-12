type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

type Meal = {
    id: number,
    name: string,
    description: string,
    calories: number,
    protein: number,
    carbohydrates: number,
    fats: number,
    mealType: MealType,
}