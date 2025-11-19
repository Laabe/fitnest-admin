import { API_BASE } from "@/lib/env";
import {Category} from "@/types/category";
import {storage} from "@/lib/storage";

async function getAllCategories(): Promise<Category[]> {
    const res = await fetch(`${API_BASE}/api/categories`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch categories");
    const json: any = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
}

async function getCategoryById(id: string): Promise<Category> {
    const res = await fetch(`${API_BASE}/api/categories/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
    });
    if (!res.ok) throw new Error(`Failed to fetch category with id ${id}`);
    const json: any = await res.json();
    return json.data;
}

async function createCategory(category: Category): Promise<Category> {
    const res = await fetch(`${API_BASE}/api/categories`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
        body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error("Failed to create category");
    const json = await res.json();
    return json.data;
}

async function editCategory(id: string, category: Category): Promise<Category> {
    const res = await fetch(`${API_BASE}/api/categories/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
        body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error(`Failed to update category with id ${id}`);
    const json = await res.json();
    return json.data;
}

async function deleteCategory(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/api/categories/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`
        },
    });
    if (!res.ok) throw new Error(`Failed to delete category with id ${id}`);
}

export const categoryService = {
    getAllCategories,
    getCategoryById,
    createCategory,
    editCategory,
    deleteCategory,
};
