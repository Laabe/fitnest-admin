"use client";

import React, { useState } from "react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useCategories} from "@/hooks/useCategories";
import {Category} from "@/types/category";
import CategoriesTable from "@/app/(protected)/categories/components/categories-table";
import CategoryDetailsSheet from "@/app/(protected)/categories/components/category-details-sheet";
import {CategoryFormSheet} from "@/app/(protected)/categories/components/category-form-sheet";
import {useMealPlans} from "@/hooks/useMealPlans";
import MealPlanTable from "@/app/(protected)/meal-plans/components/meal-plans-table";

export default function Page() {
    const { data: mealPlans, loading, error, deleteMealPlan, editMealPlan, addMealPlan } = useMealPlans();

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col p-4 min-h-min flex-1">
            <div className="mb-2 flex items-baseline justify-between gap-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Meal plans</h2>
                    <p className="text-muted-foreground">Manage your meal plans</p>
                </div>
                <Button
                    className="ml-auto hidden h-8 lg:flex bg-primary text-white shadow-sm hover:text-white hover:bg-primary/90"
                >
                    <Plus/>
                    Add Meal Plan
                </Button>
            </div>
            
            <MealPlanTable mealPlans={mealPlans} onDelete={deleteMealPlan} />
        </div>
    );
}
