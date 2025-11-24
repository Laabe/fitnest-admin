"use client";

import React from "react";
import { MealPlanTableColumns as baseColumns } from "./meal-plan-table-columns";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import {MealPlan} from "@/types/meal-plan";
import {useRouter} from "next/navigation";

interface MealPlanTableProps {
    mealPlans: MealPlan[];
    onDelete: (id: string) => void;
}

export default function MealPlanTable({ mealPlans, onDelete }: MealPlanTableProps) {
    const router = useRouter();
    const columns = React.useMemo(() => {
        return baseColumns.map((col) => {
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
                                    <DropdownMenuItem disabled={true}>View</DropdownMenuItem>
                                    <DropdownMenuItem disabled={true}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => router.push(`/meal-plans/${meal.id}/builder`)}>Build</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-500" onClick={() => onDelete(meal.id)}>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        );
                    },
                };
            }
            return col;
        });
    }, [onDelete]);

    return <DataTable columns={columns} data={mealPlans} emptyMessage="No meal plans available" />;
}
