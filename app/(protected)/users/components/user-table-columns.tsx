"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import {User} from "@/types/user";
import {Badge} from "@/components/ui/badge";

export const userTableColumns: ColumnDef<User>[] = [
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

    // Email
    {
        accessorKey: "email",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    },

    // Role
    {
        accessorKey: "role",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
        cell: ({ row }) => {
            const rawRole = row.getValue<string>("role");
            const role = rawRole.toUpperCase();

            const colorMap: Record<string, string> = {
                ADMIN: "bg-yellow-100 text-yellow-800",
            };

            return <Badge className={colorMap[role]}>{role}</Badge>;
        },
    },

    // Actions placeholder
    {
        id: "actions",
        header: "Actions",
    },
];
