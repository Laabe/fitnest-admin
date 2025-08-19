"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MealPlanForm } from "./meal-plan-form";
import { useState } from "react";
import {MealPlan} from "@/types/meal-plan";
import {useMeals} from "@/hooks/useMeals";

interface MealPlanFormSheetProps {
    mealPlan?: MealPlan;
    open: boolean;
    onClose: (open: boolean) => void;
    onSave?: (mealPlan: MealPlan) => void;
}

export function MealPlanFormSheet({ mealPlan, open, onClose, onSave }: MealPlanFormSheetProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { data: meals, loading: mealsLoading, error: mealsError } = useMeals(); // ✅ Fetch meals


    const handleSubmit = async (data: MealPlan) => {
        setLoading(true);
        setError(null);
        try {
            // call parent onSave
            if (onSave) onSave(data);
            onClose(false);
        } catch (err) {
            setError("Failed to save meal plan. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="min-w-1/3 max-w-2xl sm:w-full">
                <SheetHeader>
                    <SheetTitle>{mealPlan ? "Edit Meal Plan" : "Add Meal Plan"}</SheetTitle>
                </SheetHeader>

                {error && <p className="text-red-500">{error}</p>}
                {mealsError && <p className="text-red-500">{mealsError}</p>}

                <MealPlanForm defaultValues={mealPlan} onSubmit={handleSubmit} loading={loading || mealsLoading} availableMeals={meals} />
            </SheetContent>
        </Sheet>
    );
}
