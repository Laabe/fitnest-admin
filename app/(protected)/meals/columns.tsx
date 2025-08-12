"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {MoreHorizontal} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/data-table/data-table-column-header";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Meal>[] = [
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
    },
    {
        accessorKey: "protein",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Protein" />
        ),
    },
    {
        accessorKey: "carbohydrates",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Carbs" />
        ),
    },
    {
        accessorKey: "fats",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Fats" />
        ),
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
        cell: ({ row }) => {
            const meal = row.original

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
                        <DropdownMenuItem className={"text-red-500"}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]