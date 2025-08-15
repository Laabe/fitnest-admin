"use client";

import React, { useState } from "react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useCategories} from "@/hooks/useCategories";
import {Category} from "@/types/category";
import CategoriesTable from "@/app/(protected)/categories/components/categories-table";
import CategoryDetailsSheet from "@/app/(protected)/categories/components/category-details-sheet";
import {CategoryFormSheet} from "@/app/(protected)/categories/components/category-form-sheet";

export default function Page() {
    const { data: categories, loading, error, deleteCategory, editCategory, addCategory } = useCategories();

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isFormSheetOpen, setIsFormSheetOpen] = useState(false);

    // Open details sheet
    function handleView(category: Category) {
        setSelectedCategory(category);
        setIsDetailsOpen(true);
    }

    // Open form sheet for add or edit
    function handleEdit(category?: Category) {
        setSelectedCategory(category || null);
        setIsFormSheetOpen(true);
    }

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col p-4 min-h-min flex-1">
            <div className="mb-2 flex items-baseline justify-between gap-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
                    <p className="text-muted-foreground">Manage your categories</p>
                </div>
                <Button
                    className="ml-auto hidden h-8 lg:flex bg-primary text-white shadow-sm hover:text-white hover:bg-primary/90"
                    onClick={() => handleEdit()}
                >
                    <Plus/>
                    Add Category
                </Button>
            </div>

            <CategoriesTable
                categories={categories}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={deleteCategory}
            />

            <CategoryDetailsSheet
                category={selectedCategory}
                open={isDetailsOpen}
                onClose={setIsDetailsOpen}
            />

            <CategoryFormSheet
                category={selectedCategory || undefined}
                open={isFormSheetOpen}
                onClose={setIsFormSheetOpen}
                onSave={(savedCategory) => {
                    if (typeof savedCategory === 'object' && savedCategory.id) {
                        editCategory(savedCategory.id, savedCategory);
                    } else {
                        addCategory(savedCategory);
                    }
                }}
            />
        </div>
    );
}
