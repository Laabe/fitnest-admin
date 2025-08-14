"use client";

import { useState } from "react";
import { useMeals } from "@/hooks/useMeals";
import MealsTable from "@/app/(protected)/meals/components/meals-table";
import MealDetailsSheet from "@/app/(protected)/meals/components/meal-details-sheet";
import { Meal } from "@/types/meal-type";
import { MealFormSheet } from "@/app/(protected)/meals/components/meal-form-sheet";
import {Button} from "@/components/ui/button";
import {Toaster} from "sonner";

export default function MealsPage() {
    const { data: meals, loading, error, deleteMeal, editMeal, addMeal } = useMeals();

    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isFormSheetOpen, setIsFormSheetOpen] = useState(false);

    // Open details sheet
    function handleView(meal: Meal) {
        setSelectedMeal(meal);
        setIsDetailsOpen(true);
    }

    // Open form sheet for add or edit
    function handleEdit(meal?: Meal) {
        setSelectedMeal(meal || null);
        setIsFormSheetOpen(true);
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
                <Button
                    className="bg-primary text-white hover:bg-primary/90"
                    onClick={() => handleEdit()}
                >
                    Add Meal
                </Button>
            </div>

            <MealsTable
                meals={meals}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={deleteMeal}
            />

            <MealDetailsSheet
                meal={selectedMeal}
                open={isDetailsOpen}
                onClose={setIsDetailsOpen}
            />

            <MealFormSheet
                meal={selectedMeal || undefined}
                open={isFormSheetOpen}
                onClose={setIsFormSheetOpen}
                onSave={(savedMeal) => {
                    if (typeof savedMeal === 'object' && savedMeal.id) {
                        editMeal(savedMeal.id, savedMeal);
                    } else {
                        addMeal(savedMeal);
                    }
                }}
            />
        </div>
    );
}
