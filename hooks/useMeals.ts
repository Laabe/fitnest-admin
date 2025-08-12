"use client";
import { useEffect, useState } from "react";
import { mealService } from "@/services/meal.service";

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

    async function deleteMeal(id: string) {
        if (!confirm("Are you sure you want to delete this meal?")) return;
        try {
            await mealService.deleteMeal(id);
            setData((meals) => meals.filter((meal) => meal.id !== id));
        } catch {
            alert("Failed to delete meal.");
        }
    }

    return { data, loading, error, deleteMeal };
}
