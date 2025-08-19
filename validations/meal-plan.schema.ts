import { z } from "zod";

export const mealPlanSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    meals: z.array(
        z.string().min(1, "Meal ID is required")
    ).min(1, "At least one meal is required"),
});

export type MealPlanFormValues = z.infer<typeof mealPlanSchema>;
