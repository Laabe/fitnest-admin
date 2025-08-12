import { z } from "zod";

export const mealSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    image: z.url("Image must be a valid URL").optional(),
    calories: z.number().min(0, "Calories must be a positive number"),
    protein: z.number().min(0, "Protein must be a positive number"),
    carbohydrates: z.number().min(0, "Carbohydrates must be a positive number"),
    fats: z.number().min(0, "Fats must be a positive number"),
    meal_type: z
        .enum(["breakfast", "lunch", "dinner", "snack"])
        .refine((val) => !!val, {
            message: "Meal type must be one of breakfast, lunch, dinner, or snack",
        }),
});

export type MealFormValues = z.infer<typeof mealSchema>;
