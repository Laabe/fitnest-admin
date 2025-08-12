"use client";
import { useState } from "react";
import { useMeals } from "@/hooks/useMeals";
import MealsTable from "@/app/(protected)/meals/components/meals-table";
import MealDetailsSheet from "@/app/(protected)/meals/components/meal-details-sheet";
import { Meal } from "@/types/meal-type";
import { MealFormSheet } from "@/app/(protected)/meals/components/meal-form-sheet";

export default function MealsPage() {
    const { data: meals, loading, error, deleteMeal, editMeal, addMeal } = useMeals();

    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // Open details view sheet
    function handleView(meal: Meal) {
        setSelectedMeal(meal);
        setIsDetailsOpen(true);
    }

    if (loading) return <p>Loading meals...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col p-4 min-h-min flex-1">
            <div className="mb-2 flex items-baseline justify-between gap-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Meals</h2>
                    <p className="text-muted-foreground">Manage your meals</p>
                </div>
            </div>

            <MealsTable
                meals={meals}
                onView={handleView}
                onDelete={deleteMeal}
            />

            <MealDetailsSheet
                meal={selectedMeal}
                open={isDetailsOpen}
                onClose={setIsDetailsOpen}
            />
        </div>
    );
}
