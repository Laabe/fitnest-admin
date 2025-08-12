"use client";

import React, { useEffect, useState } from "react";
import { columns as initialColumns } from "./columns";
import { DataTable } from "./data-table";
import { mealService } from "@/services/meal.service";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";

export default function Page() {
    const [data, setData] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // fetch meals on mount
    useEffect(() => {
        async function fetchMeals() {
            try {
                setLoading(true);
                const meals = await mealService.getAllMeals();
                setData(meals);
                setError(null);
            } catch {
                setError("Failed to fetch meals");
            } finally {
                setLoading(false);
            }
        }
        fetchMeals();
    }, []);

    // handle delete meal
    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this meal?")) return;
        try {
            await mealService.deleteMeal(id);
            // remove deleted meal from data state to update table instantly
            setData((current) => current.filter((meal) => meal.id !== id));
        } catch {
            alert("Failed to delete meal.");
        }
    }

    // create new columns with delete handler injected into actions cell
    const columns = React.useMemo(() => {
        return initialColumns.map((col) => {
            if (col.id === "actions") {
                return {
                    ...col,
                    cell: ({ row }: any) => {
                        const meal = row.original;
                        return (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="text-red-500"
                                        onClick={() => handleDelete(meal.id)}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        );
                    },
                };
            }
            return col;
        });
    }, [handleDelete]);

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
