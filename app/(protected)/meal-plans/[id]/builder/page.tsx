"use client"

import React, {useEffect, useState} from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

import { RecipeCard } from "./components/recipeCard"
import { MealSection } from "./components/MealSection"

import { Meal } from "@/types/meal"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    mealPlanBuildFormValues,
    mealPlanBuildSchema
} from "@/validations/meal-plan-build.schema"

import { Button } from "@/components/ui/button"
import { useMealPlans } from "@/hooks/useMealPlans"
import {useMeals} from "@/hooks/useMeals";

export interface RecipeMealAssignment {
    recipeId: string
    recipeName: string
    mealType: "breakfast" | "lunch" | "dinner"
}

export default function App() {
    const [searchQuery, setSearchQuery] = useState("")
    const [recipeMeals, setRecipeMeals] = useState<RecipeMealAssignment[]>([])
    const { meals, getMeals } = useMeals();
    const { buildMealPlan, loading, mealPlan, getMealPlan } = useMealPlans()

    useEffect(() => {
        getMeals()
        getMealPlan()
    }, [])

    const form = useForm<mealPlanBuildFormValues>({
        resolver: zodResolver(mealPlanBuildSchema),
        defaultValues: {
            meals: {
                breakfast: [],
                lunch: [],
                dinner: [],
            }
        }
    })

    const onSubmit = async (values: mealPlanBuildFormValues) => {
        await buildMealPlan(values)
    }

    const filteredRecipes = meals.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddRecipe = (recipe: Meal, mealType: RecipeMealAssignment["mealType"]) => {
        setRecipeMeals([...recipeMeals, {
            recipeId: recipe.id!,
            recipeName: recipe.name,
            mealType,
        }])
    }

    const handleRemoveRecipe = (index: number) => {
        setRecipeMeals(recipeMeals.filter((_, i) => i !== index))
    }

    const getRecipesForMeal = (mealType: RecipeMealAssignment["mealType"]) =>
        recipeMeals
            .map((meal, index) => ({ ...meal, index }))
            .filter(meal => meal.mealType === mealType)

    const getRecipeDetails = (id: string) => {
        const r = meals.find(r => r.id === id)
        if (!r) return null

        return {
            calories: r.calories,
            protein: r.protein,
            carbs: r.carbohydrates,
            fat: r.fats,
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col p-4 min-h-min flex-1">
            {/* HEADER */}
            <div className="mb-6 flex items-baseline justify-between gap-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Build your meal plan
                    </h2>
                    <p className="text-muted-foreground">
                        Plan your meals by adding recipes to breakfast, lunch, or dinner
                    </p>
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Meal Plan"}
                </Button>
            </div>

            <div className="grid grid-cols-[30%_70%] gap-6">

                {/* LEFT: RECIPES */}
                <div className="flex flex-col">
                    <div className="mb-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                            placeholder="Search recipes..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <ScrollArea className="flex-1 max-h-[calc(100vh-240px)] pr-2">
                        <div className="space-y-3">
                            {filteredRecipes.map(recipe => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    meals={recipeMeals}
                                    onAddRecipe={handleAddRecipe}
                                />
                            ))}

                            {filteredRecipes.length === 0 && (
                                <div className="text-center py-12 text-muted-foreground">
                                    No recipes found
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {/* RIGHT: MEAL SECTIONS */}
                <div className="space-y-6">
                    <MealSection
                        title="Breakfast"
                        mealType="breakfast"
                        recipes={getRecipesForMeal("breakfast")}
                        onRemoveRecipe={handleRemoveRecipe}
                        getRecipeDetails={getRecipeDetails}
                        form={form}
                    />

                    <MealSection
                        title="Lunch"
                        mealType="lunch"
                        recipes={getRecipesForMeal("lunch")}
                        onRemoveRecipe={handleRemoveRecipe}
                        getRecipeDetails={getRecipeDetails}
                        form={form}
                    />

                    <MealSection
                        title="Dinner"
                        mealType="dinner"
                        recipes={getRecipesForMeal("dinner")}
                        onRemoveRecipe={handleRemoveRecipe}
                        getRecipeDetails={getRecipeDetails}
                        form={form}
                    />
                </div>

            </div>
        </form>
    )
}
