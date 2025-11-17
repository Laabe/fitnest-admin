"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MealForm } from "./meal-form";
import { useState } from "react";
import { Meal } from "@/types/meal";

interface MealFormSheetProps {
    meal?: Meal;
    open: boolean;
    onClose: (open: boolean) => void;
    onSave?: (meal: Meal) => void;
}

export function MealFormSheet({ meal, open, onClose, onSave }: MealFormSheetProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: Meal) => {
        setLoading(true);
        setError(null);
        try {
            if (onSave) onSave(data);
            onClose(false);
        } catch (err) {
            setError("Failed to save meal. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="min-w-1/3 max-w-2xl sm:w-full">
                <SheetHeader>
                    <SheetTitle>{meal ? "Edit Meal" : "Add Meal"}</SheetTitle>
                </SheetHeader>

                {error && <p className="text-red-500">{error}</p>}

                <MealForm defaultValues={meal} onSubmit={handleSubmit} loading={loading} />
            </SheetContent>
        </Sheet>
    );
}
