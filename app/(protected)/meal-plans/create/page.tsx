"use client"

import {MealPlanForm} from "@/app/(protected)/meal-plans/components/meal-plan-form";
import {useMeals} from "@/hooks/useMeals";

export default function Page() {
    const {data: recipes, loading, error} = useMeals();

    if (loading) return <p>Loading meals...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col p-4 min-h-min flex-1">
            <div className="mb-2 flex items-baseline justify-between gap-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Create Meal Plan</h2>
                    <p className="text-muted-foreground">Design a personalized meal plan that fits your lifestyle and
                        preferences</p>
                </div>
            </div>

            <MealPlanForm recipes={recipes}/>
        </div>
    );
}