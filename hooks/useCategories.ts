"use client";
import { useEffect, useState } from "react";
import {toast} from "sonner";
import {Category} from "@/types/category";
import {categoryService} from "@/services/category.service";

export function useCategories() {
    const [data, setData] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAll() {
            try {
                setLoading(true);
                const categories = await categoryService.getAllCategories();
                setData(categories);
                setError(null);
            } catch {
                setError("Failed to fetch meals");
            } finally {
                setLoading(false);
            }
        }
        fetchAll();
    }, []);

    async function addCategory(newCategory: Category) {
        try {
            const createdCategory = await categoryService.createCategory(newCategory);
            setData((prev) => [...prev, createdCategory]);
            toast("Category added successfully!");
        } catch {
            toast("Failed to add category.");
        }
    }

    async function editCategory(id: string, updatedCategory: Category) {
        try {
            const updated = await categoryService.editCategory(id, updatedCategory);
            setData((prev) =>
                prev.map((category) => (category.id === id ? { ...category, ...updated } : category))
            );
            toast("Category updated successfully!");
        } catch {
            toast("Failed to update category.");        }
    }

    async function deleteCategory(id: string) {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            await categoryService.deleteCategory(id);
            setData((prev) => prev.filter((category) => category.id !== id));
            toast("Category deleted successfully!");
        } catch {
            toast("Failed to delete category.");
        }
    }

    return { data, loading, error, addCategory, editCategory, deleteCategory };
}
