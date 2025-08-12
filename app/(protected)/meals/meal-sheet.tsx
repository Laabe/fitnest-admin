"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export default function MealDetailsSheet({
    meal,
    open,
    onClose,
}: {
    meal: Meal | null;
    open: boolean;
    onClose: (open: boolean) => void;
}) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{meal?.name ?? "Meal details"}</SheetTitle>
                    <SheetDescription>
                        {meal ? `Meal type: ${meal.meal_type}` : "No meal selected"}
                    </SheetDescription>
                </SheetHeader>

                {meal && (
                    <div className="flex flex-col gap-1.5 p-4">
                        <img src={meal.image} alt={meal.name} className="object-cover rounded" />
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
