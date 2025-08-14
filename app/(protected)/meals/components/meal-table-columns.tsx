"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Meal } from "@/types/meal-type";

export const mealTableColumns: ColumnDef<Meal>[] = [
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

    // Calories
    {
        accessorKey: "calories",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Calories" />,
        cell: ({ row }) => <span>{row.getValue<number>("calories")} kcal</span>,
    },

    // Protein
    {
        accessorKey: "protein",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Protein" />,
        cell: ({ row }) => <span>{row.getValue<number>("protein")} g</span>,
    },

    // Carbohydrates
    {
        accessorKey: "carbohydrates",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Carbs" />,
        cell: ({ row }) => <span>{row.getValue<number>("carbohydrates")} g</span>,
    },

    // Fats
    {
        accessorKey: "fats",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Fats" />,
        cell: ({ row }) => <span>{row.getValue<number>("fats")} g</span>,
    },

    // Meal type with badge
    {
        accessorKey: "meal_type",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Meal Type" />,
        cell: ({ row }) => {
            const mealType = row.getValue<string>("meal_type").toUpperCase();

            const colorMap: Record<string, string> = {
                BREAKFAST: "bg-yellow-100 text-yellow-800",
                LUNCH: "bg-green-100 text-green-800",
                DINNER: "bg-blue-100 text-blue-800",
                SNACK: "bg-pink-100 text-pink-800",
            };

            return <Badge className={colorMap[mealType] || "bg-gray-100 text-gray-800"}>{mealType}</Badge>;
        },
    },

    // Actions placeholder
    {
        id: "actions",
        header: "Actions",
    },
];
