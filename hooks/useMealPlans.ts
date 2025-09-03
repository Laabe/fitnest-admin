"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MealPlan } from "@/types/meal-plan";
import { mealPlanService } from "@/services/meal-plan.service";


export function useMealPlans() {
    const [data, setData] = useState<MealPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAll() {
            try {
                setLoading(true);
                const mealPlans = await mealPlanService.getAllPlans();
                setData(mealPlans);
                setError(null);
            } catch {
                setError("Failed to fetch meal plans");
            } finally {
                setLoading(false);
            }
        }
        fetchAll();
    }, []);

    async function addMealPlan(newMealPlan: MealPlan) {
        try {
            const createdMealPlan = await mealPlanService.createMealPlan(newMealPlan);
            setData((prev) => [...prev, createdMealPlan]);
            toast("Meal plan added successfully!");
        } catch {
            toast("Failed to add meal plan.");
        }
    }

    async function editMealPlan(id: string, updatedMealPlan: MealPlan) {
        try {
            const updated = await mealPlanService.editMealPlan(id, updatedMealPlan);
            setData((prev) =>
                prev.map((mealPlan) => (mealPlan.id === id ? { ...mealPlan, ...updated } : mealPlan))
            );
            toast("Meal plan updated successfully!");
        } catch {
            toast("Failed to update category.");        }
    }

    async function deleteMealPlan(id: string) {
        if (!confirm("Are you sure you want to delete this meal plan?")) return;
        try {
            await mealPlanService.deleteMealPlan(id);
            setData((prev) => prev.filter((mealPlan) => mealPlan.id !== id));
            toast("Meal plan deleted successfully!");
        } catch {
            toast("Failed to delete meal plan.");
        }
    }

    return { data, loading, error, addMealPlan, editMealPlan, deleteMealPlan };
}
