"use client";
import { useEffect, useState } from "react";
import { mealService } from "@/services/meal.service";
import { Meal } from "@/types/meal-type";
import {toast} from "sonner";

export function useMeals() {
    const [data, setData] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMeals() {
            try {
                setLoading(true);
                const meals = await mealService.getAllMeals();
                setData(meals);
                setError(null);
            } catch {
                setError("Failed to fetch meals");
            } finally {
                setLoading(false);
            }
        }
        fetchMeals();
    }, []);

    async function addMeal(newMeal: Meal) {
        try {
            const createdMeal = await mealService.createMeal(newMeal);
            setData((prev) => [...prev, createdMeal]);
            toast("Meal added successfully!");
        } catch {
            toast("Failed to add meal.");
        }
    }

    async function editMeal(id: string, updatedMeal: Meal) {
        if (!id) return;
        try {
            const updated = await mealService.editMeal(id, updatedMeal);
            setData((prev) =>
                prev.map((meal) => (meal.id === id ? { ...meal, ...updated } : meal))
            );
            toast("Meal updated successfully!");
        } catch {
            toast("Failed to update meal.");        }
    }

    async function deleteMeal(id: string) {
        if (!confirm("Are you sure you want to delete this meal?")) return;
        try {
            await mealService.deleteMeal(id);
            setData((prev) => prev.filter((meal) => meal.id !== id));
            toast("Meal deleted successfully!");
        } catch {
            toast("Failed to delete meal.");
        }
    }

    return { data, loading, error, addMeal, editMeal, deleteMeal };
}
