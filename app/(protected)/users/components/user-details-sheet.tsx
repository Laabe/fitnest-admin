"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import {User} from "@/types/user";

interface UserDetailsSheetProps {
    user: User | null;
    open: boolean;
    onClose: (open: boolean) => void;
}

export default function UserDetailsSheet({ user, open, onClose }: UserDetailsSheetProps) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="min-w-1/3 max-w-2xl sm:w-full">
                <SheetHeader>
                    <SheetTitle>{user?.name ?? "Category details"}</SheetTitle>
                    <SheetDescription>
                        {user ? user.name : "No category selected"}
                    </SheetDescription>
                </SheetHeader>

                {user && (
                    <div className="flex flex-col gap-1.5 p-4">

                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
