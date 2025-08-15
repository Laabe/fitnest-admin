"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import {Category} from "@/types/category";

interface CategoryDetailsSheetProps {
    category: Category | null;
    open: boolean;
    onClose: (open: boolean) => void;
}

export default function CategoryDetailsSheet({ category, open, onClose }: CategoryDetailsSheetProps) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="min-w-1/3 max-w-2xl sm:w-full">
                <SheetHeader>
                    <SheetTitle>{category?.name ?? "Category details"}</SheetTitle>
                    <SheetDescription>
                        {category ? category.name : "No category selected"}
                    </SheetDescription>
                </SheetHeader>

                {category && (
                    <div className="flex flex-col gap-1.5 p-4">
                        <Card className="relative overflow-hidden w-full h-64">
                            <CardContent className="p-0">
                                <div
                                    className="absolute inset-0 w-full h-full object-cover rounded"
                                    aria-label={category.name}
                                />
                            </CardContent>
                        </Card>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
