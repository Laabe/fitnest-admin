"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { MealPlan } from "@/types/meal-plan";

export const MealPlanTableColumns: ColumnDef<MealPlan>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    },
    {
        accessorKey: "sku",
        header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
    },
    {
        id: "actions",
        header: "Actions",
    },
];
