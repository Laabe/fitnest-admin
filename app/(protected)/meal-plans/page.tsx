"use client";

import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {MealPlan} from "@/types/meal-plan";
import MealPlansTable from "@/app/(protected)/meal-plans/components/meal-plans-table";
import MealPlanDetailsSheet from "@/app/(protected)/meal-plans/components/meal-plan-details-sheet";
import {MealPlanFormSheet} from "@/app/(protected)/meal-plans/components/meal-plan-form-sheet";
import {useMealPlans} from "@/hooks/useMealPlans";


export default function Page() {
    const { data: mealPlans, loading, error, deleteMealPlan, editMealPlan, addMealPlan } = useMealPlans();

    const [selectedItem, setSelectedItem] = useState<MealPlan | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isFormSheetOpen, setIsFormSheetOpen] = useState(false);

    // Open details sheet
    function handleView(mealPlan: MealPlan) {
        setSelectedItem(mealPlan);
        setIsDetailsOpen(true);
    }

    // Open form sheet for add or edit
    function handleEdit(mealPlan?: MealPlan) {
        setSelectedItem(mealPlan || null);
        setIsFormSheetOpen(true);
    }

    if (loading) return <p>Loading meal plans...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col p-4 min-h-min flex-1">
            <div className="mb-2 flex items-baseline justify-between gap-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Meal plans</h2>
                    <p className="text-muted-foreground">Manage your meal plans</p>
                </div>
                <Button
                    className="ml-auto hidden h-8 lg:flex bg-primary text-white shadow-sm hover:text-white hover:bg-primary/90"
                    onClick={() => handleEdit()}
                >
                    <Plus/>
                    Add Meal Plan
                </Button>
            </div>

            <MealPlansTable
                mealPlans={mealPlans}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={deleteMealPlan}
            />

            <MealPlanDetailsSheet
                mealPlan={selectedItem}
                open={isDetailsOpen}
                onClose={setIsDetailsOpen}
            />

            <MealPlanFormSheet
                mealPlan={selectedItem || undefined}
                open={isFormSheetOpen}
                onClose={setIsFormSheetOpen}
                onSave={(savedItem) => {
                    if (typeof savedItem === 'object' && savedItem.id) {
                        editMealPlan(savedItem.id, savedItem);
                    } else {
                        addMealPlan(savedItem);
                    }
                }}
            />
        </div>
    );
}