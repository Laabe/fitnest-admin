"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MealForm } from "./meal-form";
import { mealService } from "@/services/meal.service";
import { useState } from "react";
import {Meal} from "@/types/meal-type";

interface MealFormSheetProps {
    meal?: Meal; // if present → edit mode
    open: boolean;
    onClose: (open: boolean) => void;
}

export function MealFormSheet({
    meal,
    open,
    onClose
}: MealFormSheetProps) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: Meal) => {
        setLoading(true);
        try {
            if (meal?.id) {
                await mealService.editMeal(meal.id, data);
            } else {
                await mealService.createMeal(data);
            }
            onClose(false);
        } catch (error) {
            console.error("Error saving meal:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{meal ? "Edit Meal" : "Add Meal"}</SheetTitle>
                </SheetHeader>
                <MealForm
                    defaultValues={meal}
                    onSubmit={handleSubmit}
                    loading={loading}
                />
            </SheetContent>
        </Sheet>
    );
}
