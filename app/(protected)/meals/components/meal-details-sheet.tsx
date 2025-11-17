"use client";

import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription} from "@/components/ui/sheet";
import {Card, CardContent} from "@/components/ui/card";
import {Meal} from "@/types/meal";
import Image from "next/image";

interface MealDetailsSheetProps {
    meal: Meal | null;
    open: boolean;
    onClose: (open: boolean) => void;
}

export default function MealDetailsSheet({meal, open, onClose}: MealDetailsSheetProps) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="min-w-1/3 max-w-2xl sm:w-full">
                <SheetHeader>
                    <SheetTitle className={"text-xl font-bold"}>{meal?.name}</SheetTitle>
                </SheetHeader>

                {meal && (
                    <div className="gap-1.5 p-4 overflow-y-auto">
                        <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                            <img
                                src={meal.image || ""}
                                alt="Egg and Avocado Toast"
                                className="h-full w-full object-cover"/>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-6">
                            <div className="bg-gray-200 p-2 rounded text-center">
                                <div className="text-sm">Calories</div>
                                <div className="font-medium">{meal.calories}</div>
                            </div>
                            <div className="bg-gray-200 p-2 rounded text-center">
                                <div className="text-sm">Protein</div>
                                <div className="font-medium">{meal.protein}g</div>
                            </div>
                            <div className="bg-gray-200 p-2 rounded text-center">
                                <div className="text-sm">Carbs</div>
                                <div className="font-medium">{meal.carbohydrates}g</div>
                            </div>
                            <div className="bg-gray-200 p-2 rounded text-center">
                                <div className="text-sm">Fat</div>
                                <div className="font-medium">{meal.fats}g</div>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4">{meal.description}</p>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
