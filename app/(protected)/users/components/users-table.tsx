"use client";

import React, {useEffect} from "react";
import {userTableColumns as baseColumns} from "./user-table-columns";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {MoreHorizontal} from "lucide-react";
import {DataTable} from "@/components/data-table/data-table";
import {toast} from "sonner";
import {formatLaravelErrors} from "@/utils/formatLaravelErrors";
import {useUsers} from "@/hooks/useUsers";
import {User} from "@/types/user";


interface UserTableProps {
    onEdit: (user: User) => void;
    refreshTrigger?: number;
}

export default function UsersTable({onEdit, refreshTrigger}: UserTableProps) {
    const {users, getUsers, deleteUser} = useUsers();

    useEffect(() => {
        getUsers().catch((error: any) => {
            const messages: string[] = error.message?.split("\n") ?? ["Failed to fetch users list"];
            toast.error("Failed to fetch users list", {
                    description: formatLaravelErrors(messages),
                }
            );
        });
    }, [refreshTrigger]);

    const handleDelete = async (id: string) => {
        deleteUser(id)
            .then(() => {
                    getUsers()
                    toast.success("user deleted successfully.");
                }
            ).catch((error: any) => {
            const messages: string[] = error.message?.split("\n") ?? ["Failed to delete user!"];
            toast.error("Failed to delete user", {
                    description: formatLaravelErrors(messages),
                }
            );
        });
    }

    const columns = React.useMemo(() => {
        return baseColumns.map((col) => {
            if (col.id === "actions") {
                return {
                    ...col,
                    cell: ({row}: any) => {
                        const user = row.original;
                        return (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => onEdit(user)}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(user.id)}>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        );
                    },
                };
            }
            return col;
        });
    }, [onEdit, handleDelete]);

    return <DataTable columns={columns} data={users} emptyMessage="No users available"/>;
}
