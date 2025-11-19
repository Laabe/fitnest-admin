"use client";
import { useEffect, useState } from "react";
import { MealPlan } from "@/types/meal-plan";
import { mealPlanService } from "@/services/meal-plan.service";
import {MealPlanFormValues} from "@/validations/meal-plan.schema";


export function useMealPlans() {
    const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAll() {
            try {
                setLoading(true);
                const mealPlans = await mealPlanService.getAllPlans();
                setMealPlans(mealPlans);
                setError(null);
            } catch {
                setError("Failed to fetch meal plans");
            } finally {
                setLoading(false);
            }
        }
        fetchAll();
    }, []);

    async function addMealPlan(mealPlan: MealPlanFormValues) {
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

    async function editMealPlan(id: string, mealPlan: Partial<MealPlanFormValues>) {
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

    return {mealPlans, loading, error, addMealPlan, editMealPlan, deleteMealPlan};
}
