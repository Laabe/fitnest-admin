import {z} from "zod";

export const mealPlanBuilderSchema = z.object({
    meals: z.object({
        breakfast: z.array(z.string()).optional().default([]),
        lunch: z.array(z.string()).optional().default([]),
        dinner: z.array(z.string()).optional().default([]),
    })
});

export type mealPlanBuilderFormValues = z.infer<typeof mealPlanBuilderSchema>