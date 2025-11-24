"use client"

import React, { useEffect, useState } from "react"
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
    mealPlanBuildSchema,
} from "@/validations/meal-plan-build.schema"

import { Button } from "@/components/ui/button"
import { useMealPlans } from "@/hooks/useMealPlans"
import { useMeals } from "@/hooks/useMeals"
import {MealType} from "@/types/meal-plan";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

export interface RecipeMealAssignment {
    recipeId: string
    recipeName: string
    mealType: MealType
}

export default function BuilderPage() {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("")
    const [recipeMeals, setRecipeMeals] = useState<RecipeMealAssignment[]>([])
    const { meals, getMeals } = useMeals()
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
            },
        },
    })

    // --------------------------------------------------
    // HYDRATE FORM IF MEAL PLAN EXISTS
    // --------------------------------------------------
    useEffect(() => {
        if (!mealPlan) return

        const breakfast = mealPlan.meals.breakfast?.map(r => r) ?? []
        const lunch = mealPlan.meals.lunch?.map(r => r) ?? []
        const dinner = mealPlan.meals.dinner?.map(r => r) ?? []

        form.setValue("meals.breakfast", breakfast)
        form.setValue("meals.lunch", lunch)
        form.setValue("meals.dinner", dinner)

        // also hydrate local UI assignments
        const assigned = [
            ...breakfast.map(id => ({ recipeId: id, recipeName: meals.find(m => m.id === id)?.name || "", mealType: "breakfast" as const })),
            ...lunch.map(id => ({ recipeId: id, recipeName: meals.find(m => m.id === id)?.name || "", mealType: "lunch" as const })),
            ...dinner.map(id => ({ recipeId: id, recipeName: meals.find(m => m.id === id)?.name || "", mealType: "dinner" as const })),
        ]

        setRecipeMeals(assigned)
    }, [mealPlan, meals])

    const onSubmit = async (values: mealPlanBuildFormValues) => {
        buildMealPlan(values)
            .then(() => {
                router.push("/meal-plans")
                toast.success("Meal plans built successfully.")
            })
            .catch((err) => {
            toast.error(err.message);
        })
    }

    const filteredRecipes = meals.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleAddRecipe = (recipe: Meal, mealType: RecipeMealAssignment["mealType"]) => {
        const updated = [
            ...recipeMeals,
            {
                recipeId: recipe.id!,
                recipeName: recipe.name,
                mealType,
            },
        ]

        setRecipeMeals(updated)

        form.setValue(
            `meals.${mealType}`,
            updated
                .filter(r => r.mealType === mealType)
                .map(r => r.recipeId)
        )
    }

    const handleRemoveRecipe = (index: number) => {
        const removed = recipeMeals[index]
        if (!removed) return

        const updated = recipeMeals.filter((_, i) => i !== index)
        setRecipeMeals(updated)

        form.setValue(
            `meals.${removed.mealType}`,
            updated
                .filter(r => r.mealType === removed.mealType)
                .map(r => r.recipeId)
        )
    }

    const getRecipesForMeal = (mealType: RecipeMealAssignment["mealType"]) =>
        recipeMeals
            .map((m, index) => ({ ...m, index }))
            .filter(m => m.mealType === mealType)

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
