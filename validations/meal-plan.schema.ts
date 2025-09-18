import {z} from "zod";

export const mealPlanSchema = z.object({
    id: z.string().optional(),
    name: z.string()
        .min(1, "Name is required")
        .min(3, "Name must be at least 3 characters"),
    description: z.string()
        .min(1, "Description is required")
        .min(10, "Description must be at least 10 characters"),
    photo: z.instanceof(File).nullable().optional(),
    snacks: z.object({
        included: z.boolean(),
        price: z
            .number()
            .nullable()
            .refine((val) => val === null || val >= 0, {
                message: "Snack price must be a valid number",
            }),
    }),
    billingPeriod: z
        .object({
            monthly: z.boolean(),
            weekly: z.boolean(),
        })
        .refine((data) => data.monthly || data.weekly, {
            message: "At least one billing period must be selected",
        }),
    meals: z
        .object({
            breakfast: z.object({
                included: z.boolean(),
                price: z
                    .number()
                    .nullable()
                    .refine((val) => val === null || val >= 0, {
                        message: "Breakfast price must be a valid number",
                    }),
                recipes: z.array(z.string()),
            }),
            lunch: z.object({
                included: z.boolean(),
                price: z
                    .number()
                    .nullable()
                    .refine((val) => val === null || val >= 0, {
                        message: "Lunch price must be a valid number",
                    }),
                recipes: z.array(z.string()),
            }),
            dinner: z.object({
                included: z.boolean(),
                price: z
                    .number()
                    .nullable()
                    .refine((val) => val === null || val >= 0, {
                        message: "Dinner price must be a valid number",
                    }),
                recipes: z.array(z.string()),
            }),
        })
        .refine(
            (data) =>
                data.breakfast.included
                || data.lunch.included
                || data.dinner.included,
            {message: "At least one meal must be selected"}
        ),
});

export type MealPlanFormValues = z.infer<typeof mealPlanSchema>