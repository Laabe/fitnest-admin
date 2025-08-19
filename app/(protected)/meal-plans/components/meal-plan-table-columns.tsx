"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Meal } from "@/types/meal";
import {MealPlan} from "@/types/meal-plan";

export const mealPlanTableColumns: ColumnDef<MealPlan>[] = [
    // Selection checkbox
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    // Name
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    },


    // Meal type with badge
    {
        accessorKey: "meals",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Meals" />
        ),
        cell: ({ row }) => {
            const meals = row.getValue("meals");
            if (!meals || !Array.isArray(meals) || meals.length === 0) {
                return <Badge className="bg-gray-200 text-gray-700">No meals</Badge>;
            } else {
                return (
                    <div className="flex flex-wrap gap-1">
                        {meals.map((meal) => (
                            <Badge key={meal.id} className="bg-gray-500 text-white">
                                {meal.name}
                            </Badge>
                        ))}
                    </div>
                );
            }
        },
    },

    // Actions placeholder
    {
        id: "actions",
        header: "Actions",
    },
];
