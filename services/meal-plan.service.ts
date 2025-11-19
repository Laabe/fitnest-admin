import { API_BASE } from "@/lib/env";
import { MealPlan } from "@/types/meal-plan";
import {MealPlanFormValues} from "@/validations/meal-plan.schema";
import {storage} from "@/lib/storage";

async function getAllPlans(): Promise<MealPlan[]> {
    const res = await fetch(`${API_BASE}/api/meal-plans`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
    });

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to get meal plan list`);
        }
        throw errorData;
    }
    const json: any = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
}

async function getMealPlanById(id: string): Promise<MealPlan> {
    const res = await fetch(`${API_BASE}/api/meal-plans/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
    });

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to get meal plan`);
        }
        throw errorData;
    }

    const json: any = await res.json();
    return json.data;
}

async function createMealPlan(mealPlan: MealPlanFormValues): Promise<MealPlan> {
    const res = await fetch(`${API_BASE}/api/meal-plans`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
        body: JSON.stringify(mealPlan),
    });

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to create meal plan`);
        }
        throw errorData;
    }

    const json = await res.json();
    return json.data;
}

async function editMealPlan(id: string, mealPlan: MealPlan): Promise<MealPlan> {
    const res = await fetch(`${API_BASE}/api/meal-plans/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
        body: JSON.stringify(mealPlan),
    });

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to update meal plan`);
        }
        throw errorData;
    }

    const json = await res.json();
    return json.data;
}

async function deleteMealPlan(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/api/meal-plans/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
    });

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to delete meal plan`);
        }
        throw errorData;
    }
}

export const mealPlanService = {
    getAllPlans,
    getMealPlanById,
    createMealPlan,
    editMealPlan,
    deleteMealPlan,
};
