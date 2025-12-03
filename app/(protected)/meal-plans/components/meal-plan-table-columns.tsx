"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { MealPlan } from "@/types/meal-plan";
import {Badge} from "@/components/ui/badge";

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
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const status = (row.getValue<string>("status") || "inactive").toUpperCase();
            const colorMap: Record<string, string> = {
                ACTIVE: "bg-green-100 text-green-800",
                INACTIVE: "bg-red-100 text-red-800",
            };

            return <Badge className={colorMap[status]}>{status}</Badge>;
        },
    },
    {
        id: "actions",
        header: "Actions",
    },
];
