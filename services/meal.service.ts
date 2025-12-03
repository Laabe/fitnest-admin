import { API_BASE } from "@/lib/env";
import { Meal } from "@/types/meal";
import {storage} from "@/lib/storage";

// Define filter interface for type safety
export interface MealFilters {
    status?: string;
}

async function getAllMeals(filters?: MealFilters): Promise<Meal[]> {
    // Build query string from filters
    const params = new URLSearchParams();

    if (filters?.status) params.append("status", filters.status);
    const queryString = params.toString();
    const url = `${API_BASE}/api/meals${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch meals");
    const json: any = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
}

async function getMealById(id: string): Promise<Meal> {
    const res = await fetch(`${API_BASE}/api/meals/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
    });
    if (!res.ok) throw new Error(`Failed to fetch meal with id ${id}`);
    const json: any = await res.json();
    return json.data;
}

async function createMeal(meal: Meal): Promise<Meal> {
    const res = await fetch(`${API_BASE}/api/meals`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
        body: JSON.stringify(meal),
    });
    if (!res.ok) throw new Error("Failed to create meal");
    const json = await res.json();
    return json.data;
}

async function editMeal(id: string, meal: Meal): Promise<Meal> {
    const res = await fetch(`${API_BASE}/api/meals/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
        body: JSON.stringify(meal),
    });
    if (!res.ok) throw new Error(`Failed to update meal with id ${id}`);
    const json = await res.json();
    return json.data;
}

async function deleteMeal(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/api/meals/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
    });
    if (!res.ok) throw new Error(`Failed to delete meal with id ${id}`);
}

export const mealService = {
    getAllMeals,
    getMealById,
    createMeal,
    editMeal,
    deleteMeal,
};
