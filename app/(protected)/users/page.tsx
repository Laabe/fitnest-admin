"use client";

import React, { useState } from "react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useUsers} from "@/hooks/useUsers";
import {User} from "@/types/user";
import UsersTable from "@/app/(protected)/users/components/users-table";
import {UserFormSheet} from "@/app/(protected)/users/components/user-form-sheet";

export default function Page() {
    const { data: users, loading, error, deleteUser, editUser, addUser } = useUsers();

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isFormSheetOpen, setIsFormSheetOpen] = useState(false);

    // Open form sheet for add or edit
    function handleEdit(user?: User) {
        setSelectedUser(user || null);
        setIsFormSheetOpen(true);
    }

    if (loading) return <p>Loading users...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col p-4 min-h-min flex-1">
            <div className="mb-2 flex items-baseline justify-between gap-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Users</h2>
                    <p className="text-muted-foreground">Manage your users</p>
                </div>
                <Button
                    className="ml-auto hidden h-8 lg:flex bg-primary text-white shadow-sm hover:text-white hover:bg-primary/90"
                    onClick={() => handleEdit()}
                >
                    <Plus/>
                    Add user
                </Button>
            </div>

            <UsersTable
                users={users}
                onEdit={handleEdit}
                onDelete={deleteUser}
            />

            <UserFormSheet
                user={selectedUser || undefined}
                open={isFormSheetOpen}
                onClose={setIsFormSheetOpen}
                onSave={(savedUser) => {
                    if (typeof savedUser === 'object' && savedUser.id) {
                        editUser(savedUser.id, savedUser);
                    } else {
                        addUser(savedUser);
                    }
                }}
            />
        </div>
    );
}
