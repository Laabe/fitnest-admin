"use client";
import { useEffect, useState } from "react";
import { mealService } from "@/services/meal.service";
import { Meal } from "@/types/meal";
import {toast} from "sonner";
import {useParams} from "next/navigation";

export function useMeals() {
    const [meal, setMeal] = useState<Meal | null>(null);
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();
    const id = params.id as string;

    async function getMeal() {
        try {
            setLoading(true);
            const meal = await mealService.getMealById(id);
            setMeal(meal);
            setError(null);
        } catch {
            setError("Failed to fetch meal");
        } finally {
            setLoading(false);
        }
    }

    async function getMeals() {
        try {
            setLoading(true);
            const meals = await mealService.getAllMeals();
            setMeals(meals);
            setError(null);
        } catch {
            setError("Failed to fetch meals");
        } finally {
            setLoading(false);
        }
    }

    async function createMeal(newMeal: Meal) {
        try {
            const createdMeal = await mealService.createMeal(newMeal);
            setMeals((prev) => [...prev, createdMeal]);
            toast("Meal added successfully!");
        } catch {
            toast("Failed to add meal.");
        }
    }

    async function updateMeal(id: string, updatedMeal: Meal) {
        if (!id) return;
        try {
            const updated = await mealService.editMeal(id, updatedMeal);
            setMeals((prev) =>
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
            setMeals((prev) => prev.filter((meal) => meal.id !== id));
            toast("Meal deleted successfully!");
        } catch {
            toast("Failed to delete meal.");
        }
    }

    return {
        error,
        loading,
        meal,
        meals,
        getMeal,
        getMeals,
        createMeal,
        updateMeal,
        deleteMeal
    };
}
