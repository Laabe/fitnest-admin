"use client";

import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useUsers} from "@/hooks/useUsers";
import {User} from "@/types/user";
import UsersTable from "@/app/(protected)/users/components/users-table";
import {UserFormSheet} from "@/app/(protected)/users/components/user-form-sheet";
import {toast} from "sonner";
import {formatLaravelErrors} from "@/utils/formatLaravelErrors";

export default function Page() {
    const {updateUser, createUser, getUsers} = useUsers();
    const [isFormSheetOpen, setIsFormSheetOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Open form sheet for add or edit
    const handleEdit = (user?: User) => {
        setSelectedUser(user || null);
        setIsFormSheetOpen(true);
    }

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

            <UsersTable onEdit={handleEdit} />

            <UserFormSheet
                user={selectedUser || undefined}
                open={isFormSheetOpen}
                onClose={setIsFormSheetOpen}
                onSave={(savedUser) => {
                    if (typeof savedUser === 'object' && savedUser.id) {
                        updateUser(savedUser.id, savedUser)
                            .then(() => {
                                toast.success("User updated successfully.");
                            }).catch(err => {
                            toast.error(err.message);
                        });
                    } else {
                        createUser(savedUser).then(
                            () => {
                                setIsFormSheetOpen(false);
                                toast.success("User created successfully.");
                                getUsers().catch((error: any) => {
                                    const messages: string[] = error.message?.split("\n") ?? ["Failed to fetch users!"];
                                    toast.error("Failed to fetch users", {
                                            description: formatLaravelErrors(messages),
                                        }
                                    );
                                });
                            }
                        ).catch((error: any) => {
                            const messages: string[] = error.message?.split("\n") ?? ["Failed to create user!"];
                            toast.error("Failed to create user", {
                                    description: formatLaravelErrors(messages),
                                }
                            );
                        });
                    }
                }}
            />
        </div>
    );
}
