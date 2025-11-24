"use client"

import React, {useState} from "react"
import {Plus, Check} from "lucide-react"
import {Meal} from "@/types/meal"
import {MealAssignment} from "@/app/(protected)/meal-plans/[id]/builder/page"

import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover"
import {Button} from "@/components/ui/button"

interface RecipeCardProps {
    recipe: Meal
    meals: MealAssignment[]
    onAddRecipe: (
        recipe: Meal,
        mealType: "breakfast" | "lunch" | "dinner"
    ) => void
}

export function RecipeCard({recipe, meals, onAddRecipe}: RecipeCardProps) {
    const [justAdded, setJustAdded] = useState(false)

    const assignedMeals = meals
        .filter(meal => meal.recipeId === recipe.id)
        .map(meal => meal.mealType)

    const handleMealSelect = (mealType: "breakfast" | "lunch" | "dinner") => {
        if (assignedMeals.includes(mealType)) return

        onAddRecipe(recipe, mealType)

        setJustAdded(true)
        setTimeout(() => setJustAdded(false), 1000)
    }

    const getMealBadgeLabel = (mealType: "breakfast" | "lunch" | "dinner") =>
        mealType.charAt(0).toUpperCase() + mealType.slice(1)

    return (
        <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent>
                <div className="flex gap-4">
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col">
                        <h3 className="text-card-foreground mb-2 line-clamp-1">
                            {recipe.name}
                        </h3>

                        <div className="flex items-center gap-3 text-muted-foreground mb-3">
                            <span className={"text-xs font-medium"}>Cals: {recipe.calories}</span>
                            <div className="w-px h-4 bg-border"></div>
                            <span className={"text-xs font-medium"}>Protein: {recipe.protein}g</span>
                            <div className="w-px h-4 bg-border"></div>
                            <span className={"text-xs font-medium"}>Carbs: {recipe.carbohydrates}g</span>
                            <div className="w-px h-4 bg-border"></div>
                            <span className={"text-xs font-medium"}>Fats: {recipe.fats}g</span>
                        </div>

                        {assignedMeals.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {assignedMeals.map(mealType => (
                                    <span
                                        key={mealType}
                                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-secondary text-secondary-foreground border border-border"
                                    >
                                        {getMealBadgeLabel(mealType)}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="border-t border-border bg-muted/30 rounded-b-xl">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            className={`w-full gap-2 ${
                                justAdded
                                    ? "bg-green-500 text-white shadow-sm"
                                    : ""
                            }`}
                        >
                            {justAdded ? (
                                <>
                                    <Check className="w-4 h-4"/>
                                    Added
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4"/>
                                    Add to Meal
                                </>
                            )}
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="p-0 w-[200px]">
                        <div className="flex flex-col">
                            {(["breakfast", "lunch", "dinner"] as const).map(
                                mealType => (
                                    <button
                                        key={mealType}
                                        disabled={assignedMeals.includes(mealType)}
                                        onClick={() => handleMealSelect(mealType)}
                                        className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors ${
                                            assignedMeals.includes(mealType)
                                                ? "text-muted-foreground cursor-not-allowed bg-muted/50"
                                                : "hover:bg-accent hover:text-accent-foreground"
                                        }`}
                                    >
                                        {getMealBadgeLabel(mealType)}

                                        {assignedMeals.includes(mealType) && (
                                            <span className="text-xs text-muted-foreground">
                                                Added
                                            </span>
                                        )}
                                    </button>
                                )
                            )}
                        </div>
                    </PopoverContent>
                </Popover>
            </CardFooter>
        </Card>
    )
}
