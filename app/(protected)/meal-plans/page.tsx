"use client";

import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useMealPlans} from "@/hooks/useMealPlans";
import MealPlanTable from "@/app/(protected)/meal-plans/components/meal-plans-table";
import Link from "next/link";

export default function Page() {
    const { mealPlans, loading, error, deleteMealPlan } = useMealPlans();

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col p-4 min-h-min flex-1">
            <div className="mb-2 flex items-baseline justify-between gap-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Meal plans</h2>
                    <p className="text-muted-foreground">Manage your meal plans</p>
                </div>
                <Link href={"/meal-plans/create"}>
                    <Button
                        className="ml-auto hidden h-8 lg:flex bg-primary text-white shadow-sm hover:text-white hover:bg-primary/90"
                    >
                        <Plus/>
                        Add Meal Plan
                    </Button>
                </Link>
            </div>
            
            <MealPlanTable mealPlans={mealPlans} onDelete={deleteMealPlan} />
        </div>
    );
}
