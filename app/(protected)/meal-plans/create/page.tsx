"use client"

import {MealPlanForm} from "@/app/(protected)/meal-plans/components/meal-plan-form";

export default function Page() {
    return (
        <div className="flex flex-col p-4 min-h-min flex-1">
            <div className="mb-2 flex items-baseline justify-between gap-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Create Meal Plan</h2>
                    <p className="text-muted-foreground">Design a personalized meal plan that fits your lifestyle and preferences</p>
                </div>
            </div>
            {/* Add your meal plan creation form or components here */}
            <MealPlanForm />
        </div>
    );
}