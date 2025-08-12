"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Badge} from "@/components/ui/badge";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/data-table/data-table-column-header";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const mealTableColumns: ColumnDef<Meal>[] = [
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
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: "calories",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Calories" />
        ),
        cell: ({ row }) => (
            <span className="text-sm text-gray-700">
                {row.getValue<number>("calories")} kcal
            </span>
        )
    },
    {
        accessorKey: "protein",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Protein" />
        ),
        cell: ({ row }) => (
            <span className="text-sm text-gray-700">
                {row.getValue<number>("protein")} g
            </span>
        )
    },
    {
        accessorKey: "carbohydrates",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Carbs" />
        ),
        cell: ({ row }) => (
            <span className="text-sm text-gray-700">
                {row.getValue<number>("carbohydrates")} g
            </span>
        )
    },
    {
        accessorKey: "fats",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Fats" />
        ),
        cell: ({ row }) => (
            <span className="text-sm text-gray-700">
                {row.getValue<number>("fats")} g
            </span>
        )
    },
    {
        accessorKey: "meal_type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Meal type" />
        ),
        cell: ({ row }) => {
            const mealType = row.getValue<string>("meal_type").toUpperCase();

            // Optional: map meal types to badge colors
            const colorMap: Record<string, string> = {
                BREAKFAST: "bg-yellow-100 text-yellow-800",
                LUNCH: "bg-green-100 text-green-800",
                DINNER: "bg-blue-100 text-blue-800",
                SNACK: "bg-pink-100 text-pink-800",
            };

            const colorClass = colorMap[mealType] || "bg-gray-100 text-gray-800";

            return (
                <Badge className={colorClass}>
                    {mealType}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
    },
]