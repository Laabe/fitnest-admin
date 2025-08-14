import { API_BASE } from "@/lib/env";
import { ensureCsrf } from "@/lib/csrf";
import { getCookie } from "@/lib/cookies";
import { Meal } from "@/types/meal-type";

async function getAllMeals(): Promise<Meal[]> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/meals`, {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch meals");
    const json: any = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
}

async function getMealById(id: string): Promise<Meal> {
    const res = await fetch(`${API_BASE}/api/meals/${id}`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error(`Failed to fetch meal with id ${id}`);
    const json: any = await res.json();
    return json.data;
}

async function createMeal(meal: Meal): Promise<Meal> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/meals`, {
        method: "POST",
        credentials: "include", // ✅ important
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
        body: JSON.stringify(meal),
    });
    if (!res.ok) throw new Error("Failed to create meal");
    const json = await res.json();
    return json.data;
}

async function editMeal(id: string, meal: Meal): Promise<Meal> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/meals/${id}`, {
        method: "PUT",
        credentials: "include", // ✅ important
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
        body: JSON.stringify(meal),
    });
    if (!res.ok) throw new Error(`Failed to update meal with id ${id}`);
    const json = await res.json();
    return json.data;
}

async function deleteMeal(id: string): Promise<void> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/meals/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
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
