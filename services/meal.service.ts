import { API_BASE } from '@/lib/env';
import {ensureCsrf} from "@/lib/csrf";
import {getCookie} from "@/lib/cookies";

async function getAllMeals(): Promise<Meal[]> {
    await ensureCsrf();
    const xsrf = getCookie('XSRF-TOKEN') || '';
    const res = await fetch(`${API_BASE}/api/meals`, {
        method: 'GET',
        credentials: 'include', // Include cookies for session management
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-XSRF-TOKEN': xsrf,
        },
    });
    if (!res.ok) throw new Error('Failed to fetch meals');
    const json: any = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
}

async function getMealById(id: number): Promise<Meal> {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch meal with id ${id}`);
    return res.json();
}

async function createMeal(meal: Meal): Promise<Meal> {
    const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meal),
    });
    if (!res.ok) throw new Error('Failed to create meal');
    return res.json();
}

async function updateMeal(id: number, meal: Meal): Promise<Meal> {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meal),
    });
    if (!res.ok) throw new Error(`Failed to update meal with id ${id}`);
    return res.json();
}

async function deleteMeal(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Failed to delete meal with id ${id}`);
}

export const mealService = {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal,
};