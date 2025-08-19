"use client";

import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";

import {MealPlan} from "@/types/meal-plan";

interface MealPlanDetailsSheetProps {
    mealPlan: MealPlan | null;
    open: boolean;
    onClose: (open: boolean) => void;
}

export default function MealPlanDetailsSheet({mealPlan, open, onClose}: MealPlanDetailsSheetProps) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="min-w-1/3 max-w-2xl sm:w-full">
                <SheetHeader>
                    <SheetTitle>{mealPlan?.name ?? "Meal details"}</SheetTitle>
                </SheetHeader>

                {mealPlan && (
                    <div className="flex flex-col gap-1.5 p-4">
                        <h3 className="text-lg font-semibold">{mealPlan.name}</h3>
                        <p className="text-sm text-gray-500">{mealPlan.description}</p>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
