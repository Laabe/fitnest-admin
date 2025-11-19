import {z} from "zod";

export const mealPlanSchema = z.object({
    id: z.string().optional(),
    name: z.string()
        .min(1, "Name is required")
        .min(3, "Name must be at least 3 characters"),
    sku: z.string().regex(/^SKU-\d{4}-\d{4}$/, "Invalid SKU format"),
    description: z.string()
        .min(1, "Description is required")
        .min(10, "Description must be at least 10 characters"),
    breakfast_price_per_day: z.number().min(0),
    lunch_price_per_day: z.number().min(0),
    dinner_price_per_day: z.number().min(0),
    snack_price_per_day: z.number().nullable(),
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

export type MealPlanFormValues = z.infer<typeof mealPlanSchema>