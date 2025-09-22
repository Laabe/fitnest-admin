"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Meal } from "@/types/meal";
import {Product} from "@/types/product";

export const productTableColumns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    },
    {
        accessorKey: "price.base",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    },
    {
        accessorKey: "category.name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    },
    {
        accessorKey: "stock_quantity",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
    },
    {
        accessorKey: "sku",
        header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
    },
    {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const rawStatus = row.getValue<string>("status");
            const status = rawStatus.toUpperCase();

            const colorMap: Record<string, string> = {
                ACTIVE: "bg-green-100 text-green-800",
                DRAFT: "bg-yellow-100 text-yellow-800",
                ARCHIVED: "bg-red-100 text-red-800",
            };

            return <Badge className={colorMap[status]}>{status}</Badge>;
        },
    },
    {
        id: "actions",
        header: "Actions",
    },
];
