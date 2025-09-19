"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { UserForm } from "./user-form";
import { useState } from "react";
import {Category} from "@/types/category";
import {User} from "@/types/user";

interface UserFormSheetProps {
    user?: User;
    open: boolean;
    onClose: (open: boolean) => void;
    onSave?: (user: User) => void;
}

export function UserFormSheet({ user, open, onClose, onSave }: UserFormSheetProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: User) => {
        setLoading(true);
        setError(null);
        try {
            // call parent onSave
            if (onSave) onSave(data);
            onClose(false);
        } catch (err) {
            setError("Failed to save user. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="min-w-1/3 max-w-2xl sm:w-full">
                <SheetHeader>
                    <SheetTitle>{user ? "Edit User" : "Add User"}</SheetTitle>
                </SheetHeader>

                {error && <p className="text-red-500">{error}</p>}

                <UserForm defaultValues={user} onSubmit={handleSubmit} loading={loading} />
            </SheetContent>
        </Sheet>
    );
}
