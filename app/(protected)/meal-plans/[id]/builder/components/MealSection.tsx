"use client"

import React from "react"
import {X} from "lucide-react"
import {UseFormReturn} from "react-hook-form"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {FormField, FormItem} from "@/components/ui/form"
import {mealPlanBuildFormValues} from "@/validations/meal-plan-build.schema"

interface MealRecipe {
    recipeId: string
    recipeName: string
    index: number
}

interface MealSectionProps {
    title: string
    mealType: "breakfast" | "lunch" | "dinner"
    recipes: MealRecipe[]
    onRemoveRecipe: (index: number) => void
    getRecipeDetails?: (
        recipeId: string
    ) => { calories: number; protein: number; carbs: number; fat: number } | null
    form: UseFormReturn<mealPlanBuildFormValues>
}

export function MealSection(
    {
        title,
        mealType,
        recipes,
        onRemoveRecipe,
        getRecipeDetails,
        form
    }: MealSectionProps) {
    React.useEffect(() => {
        const ids = recipes.map(r => r.recipeId)

        form.setValue(`meals.${mealType}`, ids, {
            shouldValidate: true,
            shouldDirty: true,
        })
    }, [recipes])

    return (
        <Card className="rounded-xl border shadow-sm">
            <CardHeader className="flex items-center justify-between">
                <CardTitle>{title}</CardTitle>
                <span className="text-sm text-muted-foreground">
          {recipes.length} recipes
        </span>
            </CardHeader>

            <CardContent>
                <FormField
                    control={form.control}
                    name={`meals.${mealType}`}
                    render={() => (
                        <FormItem>
                            {recipes.length === 0 ? (
                                <div
                                    className="text-center py-8 text-muted-foreground bg-muted/50 rounded-lg border-2 border-dashed border-border">
                                    No recipes added yet
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-3">
                                    {recipes.map((recipe) => {
                                        const details = getRecipeDetails?.(recipe.recipeId)

                                        return (
                                            <div
                                                key={recipe.index}
                                                className="flex flex-col p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors group border border-border relative"
                                            >
                                                {/* Remove */}
                                                <button
                                                    type="button"
                                                    onClick={() => onRemoveRecipe(recipe.index)}
                                                    className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all p-1.5 rounded-md opacity-0 group-hover:opacity-100"
                                                >
                                                    <X className="w-4 h-4"/>
                                                </button>

                                                <span className="text-card-foreground pr-8 mb-2">
                                                  {recipe.recipeName}
                                                </span>

                                                {details && (
                                                    <div
                                                        className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                                                        <span>{details.calories} cal</span>
                                                        <div className="w-px h-3 bg-border"/>
                                                        <span>P: {details.protein}g</span>
                                                        <div className="w-px h-3 bg-border"/>
                                                        <span>C: {details.carbs}g</span>
                                                        <div className="w-px h-3 bg-border"/>
                                                        <span>F: {details.fat}g</span>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}
