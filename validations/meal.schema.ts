import {z} from "zod";

export const mealSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    sku: z.string().regex(/^SKU-\d{4}-\d{4}$/, "Invalid SKU format"),
    calories: z.float64().min(0, "Calories must be a positive number"),
    protein: z.float64().min(0, "Protein must be a positive number"),
    carbohydrates: z.float64().min(0, "Carbohydrates must be a positive number"),
    fats: z.float64().min(0, "Fats must be a positive number"),
    image: z
        .string()
        .trim()
        .transform((val) => (val === "" ? undefined : val))
        .optional()
        .refine((val) => !val || /^https?:\/\/.+$/.test(val), {
                message: "Image must be a valid URL",
            }
        ),
});

export type MealFormValues = z.infer<typeof mealSchema>;
