import {z} from "zod";

export const mealPlanBuildSchema = z.object({
    meals: z.object({
        breakfast: z.array(z.string()).catch([]),
        lunch: z.array(z.string()).catch([]),
        dinner: z.array(z.string()).catch([]),
    })
});

export type mealPlanBuildFormValues = z.infer<typeof mealPlanBuildSchema>