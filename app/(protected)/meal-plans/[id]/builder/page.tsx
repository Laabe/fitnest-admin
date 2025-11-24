"use client"

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import {RecipeCard} from "@/app/(protected)/meal-plans/[id]/builder/components/recipeCard";
import {MealSection} from "@/app/(protected)/meal-plans/[id]/builder/components/MealSection";
import {Meal} from "@/types/meal";
import {MealPlanForm} from "@/app/(protected)/meal-plans/components/meal-plan-form";


export interface MealAssignment {
    recipeId: string;
    recipeName: string;
    mealType: 'breakfast' | 'lunch' | 'dinner';
}

const RECIPES: Meal[] = [
    {
        id: '1',
        name: 'Fluffy Pancakes',
        image: 'https://images.unsplash.com/photo-1637533114107-1dc725c6e576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBwYW5jYWtlc3xlbnwxfHx8fDE3NjM3MTUxMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        calories: 350,
        protein: 8,
        carbohydrates: 45,
        fats: 15,
        description: "",
        sku: ""
    },
    {
        id: '2',
        name: 'Grilled Chicken Salad',
        image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHNhbGFkfGVufDF8fHx8MTc2MzY5NTkzNnww&ixlib=rb-4.1.0&q=80&w=1080',
        calories: 420,
        protein: 35,
        carbohydrates: 25,
        fats: 18,
        description: "",
        sku: ""
    },
    {
        id: '3',
        name: 'Creamy Pasta Alfredo',
        image: 'https://images.unsplash.com/photo-1644704001249-0d9dbb842238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpbm5lcnxlbnwxfHx8fDE3NjM2NzQxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        calories: 680,
        protein: 22,
        carbohydrates: 75,
        fats: 32,
        description: "",
        sku: ""
    },
    {
        id: '4',
        name: 'Avocado Toast',
        image: 'https://images.unsplash.com/photo-1687276287139-88f7333c8ca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwdG9hc3R8ZW58MXx8fHwxNzYzNzAzODUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        calories: 280,
        protein: 10,
        carbohydrates: 30,
        fats: 14,
        description: "",
        sku: ""
    },
    {
        id: '5',
        name: 'Sushi Roll Platter',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJvbGx8ZW58MXx8fHwxNzYzNzQwMjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        calories: 450,
        protein: 18,
        carbohydrates: 65,
        fats: 12,
        description: "",
        sku: ""
    },
];

export default function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [meals, setMeals] = useState<MealAssignment[]>([]);

    const filteredRecipes = RECIPES.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddRecipe = (recipe: Meal, mealType: 'breakfast' | 'lunch' | 'dinner') => {
        const newAssignment: MealAssignment = {
            recipeId: recipe.id!,
            recipeName: recipe.name,
            mealType,
        };
        setMeals([...meals, newAssignment]);
    };

    const handleRemoveRecipe = (index: number) => {
        setMeals(meals.filter((_, i) => i !== index));
    };

    const getRecipesForMeal = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
        return meals
            .map((meal, index) => ({ ...meal, index }))
            .filter(meal => meal.mealType === mealType);
    };

    const getRecipeDetails = (recipeId: string) => {
        const recipe = RECIPES.find(r => r.id === recipeId);
        if (!recipe) return null;
        return {
            calories: recipe.calories,
            protein: recipe.protein,
            carbs: recipe.carbohydrates,
            fat: recipe.fats,
        };
    };

    return (
        <div className="flex flex-col p-4 min-h-min flex-1">
            <div className="mb-6 flex items-baseline justify-between gap-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Build your meal plan</h2>
                    <p className="text-muted-foreground">
                        Plan your meals by adding recipes to breakfast, lunch, or dinner
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-[30%_70%] gap-6">
                {/* LEFT COLUMN: Recipe List */}
                <div className="flex flex-col">
                    <div className="mb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search recipes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto max-h-[calc(100vh-240px)] space-y-3 pr-2">
                        {filteredRecipes.map(recipe => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                meals={meals}
                                onAddRecipe={handleAddRecipe}
                            />
                        ))}
                        {filteredRecipes.length === 0 && (
                            <div className="text-center py-12 text-neutral-500">
                                No recipes found
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Meals */}
                <div className="space-y-6">
                    <MealSection
                        title="Breakfast"
                        mealType="breakfast"
                        recipes={getRecipesForMeal('breakfast')}
                        onRemoveRecipe={handleRemoveRecipe}
                        getRecipeDetails={getRecipeDetails}
                    />
                    <MealSection
                        title="Lunch"
                        mealType="lunch"
                        recipes={getRecipesForMeal('lunch')}
                        onRemoveRecipe={handleRemoveRecipe}
                        getRecipeDetails={getRecipeDetails}
                    />
                    <MealSection
                        title="Dinner"
                        mealType="dinner"
                        recipes={getRecipesForMeal('dinner')}
                        onRemoveRecipe={handleRemoveRecipe}
                        getRecipeDetails={getRecipeDetails}
                    />
                </div>
            </div>
        </div>
    );
}