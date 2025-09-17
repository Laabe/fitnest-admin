import { z } from "zod";

const mealPlanSchema = z.object({
    // Step 1 - Meal Plan Details
    name: z.string().min(1, "Plan name is required").min(3, "Plan name must be at least 3 characters"),
    description: z.string().min(1, "Description is required").min(10, "Description must be at least 10 characters"),
    photo: z.instanceof(File).nullable().optional(),

    // Step 2 - Meal Plan Settings
    withSnack: z.boolean(),
    snackPrice: z.string().refine((val) => !val || !isNaN(Number(val)), "Must be a valid number"),
    period: z
        .object({
            monthly: z.boolean(),
            weekly: z.boolean(),
        })
        .refine((data) => data.monthly || data.weekly, "At least one billing period must be selected"),
    meals: z
        .object({
            breakfast: z.boolean(),
            lunch: z.boolean(),
            dinner: z.boolean(),
        })
        .refine((data) => data.breakfast || data.lunch || data.dinner, "At least one meal must be selected"),
    mealPrices: z.object({
        breakfast: z.string().refine((val) => !val || !isNaN(Number(val)), "Must be a valid number"),
        lunch: z.string().refine((val) => !val || !isNaN(Number(val)), "Must be a valid number"),
        dinner: z.string().refine((val) => !val || !isNaN(Number(val)), "Must be a valid number"),
    }),

    // Step 3 - Meal Plan Recipes
    selectedRecipes: z.object({
        breakfast: z.array(z.string()),
        lunch: z.array(z.string()),
        dinner: z.array(z.string()),
    }),
    customRecipes: z.string().optional(),
})

type MealPlanFormData = z.infer<typeof mealPlanSchema>