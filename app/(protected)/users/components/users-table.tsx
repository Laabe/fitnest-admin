"use client";

import React from "react";
import { userTableColumns as baseColumns } from "./user-table-columns";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import {Category} from "@/types/category";
import {User} from "@/types/user";

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: string) => void;
}

export default function UsersTable({ users, onEdit, onDelete }: UserTableProps) {
    const columns = React.useMemo(() => {
        return baseColumns.map((col) => {
            if (col.id === "actions") {
                return {
                    ...col,
                    cell: ({ row }: any) => {
                        const user = row.original;
                        return (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => onEdit(user)}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onDelete(user.id)}>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        );
                    },
                };
            }
            return col;
        });
    }, [onEdit, onDelete]);

    return <DataTable columns={columns} data={users} emptyMessage="No users available" />;
}
