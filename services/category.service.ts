import { API_BASE } from "@/lib/env";
import { ensureCsrf } from "@/lib/csrf";
import { getCookie } from "@/lib/cookies";
import {Category} from "@/types/category";

async function getAllCategories(): Promise<Category[]> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/categories`, {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch categories");
    const json: any = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
}

async function getCategoryById(id: string): Promise<Category> {
    const res = await fetch(`${API_BASE}/api/categories/${id}`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error(`Failed to fetch category with id ${id}`);
    const json: any = await res.json();
    return json.data;
}

async function createCategory(category: Category): Promise<Category> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/categories`, {
        method: "POST",
        credentials: "include", // ✅ important
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
        body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error("Failed to create category");
    const json = await res.json();
    return json.data;
}

async function editCategory(id: string, category: Category): Promise<Category> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/categories/${id}`, {
        method: "PUT",
        credentials: "include", // ✅ important
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
        body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error(`Failed to update category with id ${id}`);
    const json = await res.json();
    return json.data;
}

async function deleteCategory(id: string): Promise<void> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
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
