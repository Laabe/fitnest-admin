"use client";

import React from "react";
import { mealTableColumns as baseColumns } from "./meal-table-columns";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {DataTable} from "@/components/data-table/data-table";
import {Meal} from "@/types/meal-type";

export default function MealsTable({
                                       meals,
                                       onView,
                                       onDelete,
                                   }: {
    meals: Meal[],
    onView: (meal: Meal) => void,
    onDelete: (id: string) => void,
}) {
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
                        <DropdownMenuItem onClick={() => onView(meal)}>View</DropdownMenuItem>
                        <DropdownMenuItem >Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onClick={() => onDelete(meal.id)}>
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
    }, [onView, onDelete]);

    return <DataTable columns={columns} data={meals} emptyMessage="No meals available" />;
}
