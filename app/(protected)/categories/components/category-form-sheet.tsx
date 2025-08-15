"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { useState } from "react";
import {Category} from "@/types/category";

interface CategoryFormSheetProps {
    category?: Category;
    open: boolean;
    onClose: (open: boolean) => void;
    onSave?: (category: Category) => void;
}

export function CategoryFormSheet({ category, open, onClose, onSave }: CategoryFormSheetProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: Category) => {
        setLoading(true);
        setError(null);
        try {
            // call parent onSave
            if (onSave) onSave(data);
            onClose(false);
        } catch (err) {
            setError("Failed to save category. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="min-w-1/3 max-w-2xl sm:w-full">
                <SheetHeader>
                    <SheetTitle>{category ? "Edit Category" : "Add Category"}</SheetTitle>
                </SheetHeader>

                {error && <p className="text-red-500">{error}</p>}

                <CategoryForm defaultValues={category} onSubmit={handleSubmit} loading={loading} />
            </SheetContent>
        </Sheet>
    );
}
