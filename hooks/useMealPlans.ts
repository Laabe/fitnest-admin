"use client";
import {useState} from "react";
import {MealPlan} from "@/types/meal-plan";
import {mealPlanService} from "@/services/meal-plan.service";
import {MealPlanFormValues} from "@/validations/meal-plan.schema";
import {mealPlanBuildFormValues} from "@/validations/meal-plan-build.schema";
import {useParams} from "next/navigation";


export function useMealPlans() {
    const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
    const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const id = params.id as string;

    async function getMealPlan() {
        try {
            setLoading(true);
            const mealPlan = await mealPlanService.getMealPlanById(id);
            setMealPlan(mealPlan);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to get meal plan");
        } finally {
            setLoading(false);
        }
    }

    async function getMealPlans() {
        try {
            setLoading(true);
            const mealPlans = await mealPlanService.getAllPlans();
            setMealPlans(mealPlans);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to get meal plans");
        } finally {
            setLoading(false);
        }
    }

    async function createMealPlan(mealPlan: MealPlanFormValues) {
        setLoading(true);
        try {
            return await mealPlanService.createMealPlan(mealPlan);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to create meal plan");
        } finally {
            setLoading(false);
        }
    }

    async function updateMealPlan(id: string, mealPlan: Partial<MealPlanFormValues>) {
        try {
            setLoading(true);
            return await mealPlanService.editMealPlan(id, mealPlan);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }
            throw new Error("Failed to update meal plan");
        } finally {
            setLoading(false);
        }
    }

    async function deleteMealPlan(id: string) {
        if (!confirm("Are you sure you want to delete this meal plan?")) return;
        try {
            setLoading(true);
            setMealPlans((prev) => prev.filter((mealPlan) => mealPlan.id !== id));
            await mealPlanService.deleteMealPlan(id);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to delete meal plan");
        } finally {
            setLoading(false);
        }
    }

    async function buildMealPlan(mealPlanBuild: mealPlanBuildFormValues) {
        setLoading(true);
        try {
            return await mealPlanService.buildMealPlan(id, mealPlanBuild);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to build meal plan");
        } finally {
            setLoading(false);
        }
    }

    return {
        error,
        loading,
        mealPlan,
        mealPlans,
        getMealPlan,
        getMealPlans,
        createMealPlan,
        updateMealPlan,
        deleteMealPlan,
        buildMealPlan
    };
}
