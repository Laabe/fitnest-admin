"use client";

import React from "react";
import { categoryTableColumns as baseColumns } from "./category-table-columns";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import {Category} from "@/types/category";

interface CategoryTableProps {
    categories: Category[];
    onView: (category: Category) => void;
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
}

export default function CategoriesTable({ categories, onView, onEdit, onDelete }: CategoryTableProps) {
    const columns = React.useMemo(() => {
        return baseColumns.map((col) => {
            if (col.id === "actions") {
                return {
                    ...col,
                    cell: ({ row }: any) => {
                        const meal = row.original;
                        return (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => onView(meal)}>View</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onEdit(meal)}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-500" onClick={() => onDelete(meal.id)}>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        );
                    },
                };
            }
            return col;
        });
    }, [onView, onEdit, onDelete]);

    return <DataTable columns={columns} data={categories} emptyMessage="No categories available" />;
}
