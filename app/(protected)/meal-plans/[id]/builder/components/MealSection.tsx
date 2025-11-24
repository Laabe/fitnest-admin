import React from 'react';
import { X } from 'lucide-react';

interface MealRecipe {
    recipeId: string;
    recipeName: string;
    index: number;
}

interface MealSectionProps {
    title: string;
    mealType: 'breakfast' | 'lunch' | 'dinner';
    recipes: MealRecipe[];
    onRemoveRecipe: (index: number) => void;
    getRecipeDetails?: (recipeId: string) => { calories: number; protein: number; carbs: number; fat: number } | null;
}

export function MealSection({ title, recipes, onRemoveRecipe, getRecipeDetails }: MealSectionProps) {
    return (
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="px-6 py-3 border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                    <h2 className="text-card-foreground font-semibold">{title}</h2>
                    <span className="text-sm text-muted-foreground">
            {recipes.length > 0 ? (
                <>{recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}</>
            ) : (
                <span className="opacity-0">0 recipes</span>
            )}
          </span>
                </div>
            </div>

            <div className="p-4">
                {recipes.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground bg-muted/50 rounded-lg border-2 border-dashed border-border">
                        No recipes added yet
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {recipes.map((recipe) => {
                            const details = getRecipeDetails?.(recipe.recipeId);
                            return (
                                <div
                                    key={recipe.index}
                                    className="flex flex-col p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors group border border-border relative"
                                >
                                    <button
                                        onClick={() => onRemoveRecipe(recipe.index)}
                                        className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all p-1.5 rounded-md opacity-0 group-hover:opacity-100"
                                        aria-label="Remove recipe"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>

                                    <span className="text-card-foreground pr-8 mb-2">{recipe.recipeName}</span>

                                    {details && (
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                                            <span>{details.calories} cal</span>
                                            <div className="w-px h-3 bg-border"></div>
                                            <span>P: {details.protein}g</span>
                                            <div className="w-px h-3 bg-border"></div>
                                            <span>C: {details.carbs}g</span>
                                            <div className="w-px h-3 bg-border"></div>
                                            <span>F: {details.fat}g</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}