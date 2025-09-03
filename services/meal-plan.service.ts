import { API_BASE } from "@/lib/env";
import { ensureCsrf } from "@/lib/csrf";
import { getCookie } from "@/lib/cookies";
import { MealPlan } from "@/types/meal-plan";

async function getAllPlans(): Promise<MealPlan[]> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/meal-plans`, {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch meal plans");
    const json: any = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
}

async function getMealPlanById(id: string): Promise<MealPlan> {
    const res = await fetch(`${API_BASE}/api/meal-plans/${id}`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error(`Failed to fetch meal plan with id ${id}`);
    const json: any = await res.json();
    return json.data;
}

async function createMealPlan(mealPlan: MealPlan): Promise<MealPlan> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/meal-plans`, {
        method: "POST",
        credentials: "include", // ✅ important
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
        body: JSON.stringify(mealPlan),
    });
    if (!res.ok) throw new Error("Failed to create meal plan");
    const json = await res.json();
    return json.data;
}

async function editMealPlan(id: string, mealPlan: MealPlan): Promise<MealPlan> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/meal-plans/${id}`, {
        method: "PUT",
        credentials: "include", // ✅ important
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
        body: JSON.stringify(mealPlan),
    });
    if (!res.ok) throw new Error(`Failed to update meal plan with id ${id}`);
    const json = await res.json();
    return json.data;
}

async function deleteMealPlan(id: string): Promise<void> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/meal-plans/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
    });
    if (!res.ok) throw new Error(`Failed to delete meal plan with id ${id}`);
}

export const mealPlanService = {
    getAllPlans,
    getMealPlanById,
    createMealPlan,
    editMealPlan,
    deleteMealPlan,
};
