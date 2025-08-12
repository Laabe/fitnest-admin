"use client";

import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { mealService } from "@/services/meal.service";

export default function Page() {
    const [data, setData] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMeals() {
            try {
                setLoading(true);
                const meals = await mealService.getAllMeals();
                setData(meals);
                setError(null);
            } catch (err) {
                setError("Failed to fetch meals.");
            } finally {
                setLoading(false);
            }
        }

        fetchMeals();
    }, []);

    if (loading) return <p>Loading meals...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className={"flex min-h-min flex-1 flex-col p-4"}>
            <div className={"mb-2 flex items-baseline justify-between gap-2"}>
                <div>
                    <h2 className={"text-2xl font-bold tracking-tight"}>Meals</h2>
                    <p className={"text-muted-foreground"}>Manage your meals</p>
                </div>
            </div>
            <div className="flex-1">
                <div className="space-y-4">
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    );
}
