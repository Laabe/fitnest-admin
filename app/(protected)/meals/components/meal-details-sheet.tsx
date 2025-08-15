"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Meal } from "@/types/meal";

interface MealDetailsSheetProps {
    meal: Meal | null;
    open: boolean;
    onClose: (open: boolean) => void;
}

export default function MealDetailsSheet({ meal, open, onClose }: MealDetailsSheetProps) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="min-w-1/3 max-w-2xl sm:w-full">
                <SheetHeader>
                    <SheetTitle>{meal?.name ?? "Meal details"}</SheetTitle>
                    <SheetDescription>
                        {meal ? `Meal type: ${meal.meal_type}` : "No meal selected"}
                    </SheetDescription>
                </SheetHeader>

                {meal && (
                    <div className="flex flex-col gap-1.5 p-4">
                        <Card className="relative overflow-hidden w-full h-64">
                            <CardContent className="p-0">
                                <div
                                    className="absolute inset-0 w-full h-full object-cover rounded"
                                    style={{
                                        backgroundImage: `url(${meal.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                    aria-label={meal.name}
                                />
                            </CardContent>
                        </Card>
                        <h3 className="text-lg font-semibold">{meal.name}</h3>
                        <p className="text-sm text-gray-500">{meal.description}</p>
                        <div className="mt-2 space-y-1">
                            <p><strong>Calories:</strong> {meal.calories} kcal</p>
                            <p><strong>Protein:</strong> {meal.protein} g</p>
                            <p><strong>Carbs:</strong> {meal.carbohydrates} g</p>
                            <p><strong>Fat:</strong> {meal.fats} g</p>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
