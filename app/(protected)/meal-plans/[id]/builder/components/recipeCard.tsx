import React, {useState, useRef, useEffect} from 'react';
import {Plus, Check} from 'lucide-react';
import {Meal} from "@/types/meal";
import {MealAssignment} from "@/app/(protected)/meal-plans/[id]/builder/page";

interface RecipeCardProps {
    recipe: Meal;
    meals: MealAssignment[];
    onAddRecipe: (recipe: Meal, mealType: 'breakfast' | 'lunch' | 'dinner') => void;
}

export function RecipeCard({recipe, meals, onAddRecipe}: RecipeCardProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [justAdded, setJustAdded] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Check which meals this recipe is already in
    const assignedMeals = meals
        .filter(meal => meal.recipeId === recipe.id)
        .map(meal => meal.mealType);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleAddClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleMealSelect = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
        // Check if recipe is already in this meal
        if (assignedMeals.includes(mealType)) {
            return;
        }

        onAddRecipe(recipe, mealType);
        setIsDropdownOpen(false);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1000);
    };

    const getMealBadgeLabel = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
        return mealType.charAt(0).toUpperCase() + mealType.slice(1);
    };

    return (
        <div className="bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-200">
            <div className="p-5">
                <div className="flex gap-4">
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col">
                        <h3 className="text-card-foreground mb-2 line-clamp-1">{recipe.name}</h3>
                        <div className="flex items-center gap-3 text-muted-foreground mb-3">
                            <span className="text-sm font-medium">{recipe.calories} cal</span>
                            <div className="w-px h-4 bg-border"></div>
                            <span className="text-sm">P: {recipe.protein}g</span>
                            <div className="w-px h-4 bg-border"></div>
                            <span className="text-sm">C: {recipe.carbohydrates}g</span>
                            <div className="w-px h-4 bg-border"></div>
                            <span className="text-sm">F: {recipe.fats}g</span>
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
            </div>

            <div className="border-t border-border px-5 py-3 bg-muted/30 rounded-b-xl">
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={handleAddClick}
                        className={`w-full px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                            justAdded
                                ? 'bg-green-500 text-white shadow-sm'
                                : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow'
                        }`}
                    >
                        {justAdded ? (
                            <>
                                <Check className="w-4 h-4" />
                                <span>Added</span>
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4" />
                                <span>Add to Meal</span>
                            </>
                        )}
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-2 bg-popover border border-border rounded-xl shadow-lg py-1.5 z-10 overflow-hidden">
                            <button
                                onClick={() => handleMealSelect('breakfast')}
                                disabled={assignedMeals.includes('breakfast')}
                                className={`w-full px-4 py-2.5 text-left transition-colors flex items-center justify-between ${
                                    assignedMeals.includes('breakfast')
                                        ? 'text-muted-foreground cursor-not-allowed bg-muted/50'
                                        : 'text-popover-foreground hover:bg-accent hover:text-accent-foreground'
                                }`}
                            >
                                <span>Breakfast</span>
                                {assignedMeals.includes('breakfast') && (
                                    <span className="text-xs text-muted-foreground">Added</span>
                                )}
                            </button>
                            <button
                                onClick={() => handleMealSelect('lunch')}
                                disabled={assignedMeals.includes('lunch')}
                                className={`w-full px-4 py-2.5 text-left transition-colors flex items-center justify-between ${
                                    assignedMeals.includes('lunch')
                                        ? 'text-muted-foreground cursor-not-allowed bg-muted/50'
                                        : 'text-popover-foreground hover:bg-accent hover:text-accent-foreground'
                                }`}
                            >
                                <span>Lunch</span>
                                {assignedMeals.includes('lunch') && (
                                    <span className="text-xs text-muted-foreground">Added</span>
                                )}
                            </button>
                            <button
                                onClick={() => handleMealSelect('dinner')}
                                disabled={assignedMeals.includes('dinner')}
                                className={`w-full px-4 py-2.5 text-left transition-colors flex items-center justify-between ${
                                    assignedMeals.includes('dinner')
                                        ? 'text-muted-foreground cursor-not-allowed bg-muted/50'
                                        : 'text-popover-foreground hover:bg-accent hover:text-accent-foreground'
                                }`}
                            >
                                <span>Dinner</span>
                                {assignedMeals.includes('dinner') && (
                                    <span className="text-xs text-muted-foreground">Added</span>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}