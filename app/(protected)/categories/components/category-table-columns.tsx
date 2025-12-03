"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import {Category} from "@/types/category";

export const categoryTableColumns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    },
    {
        id: "actions",
        header: "Actions",
    },
];
