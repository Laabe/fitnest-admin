"use client";

import React from "react";
import { productTableColumns as baseColumns } from "./product-table-columns";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { Meal } from "@/types/meal";
import {useProducts} from "@/hooks/useProducts";


export default function ProductTable() {
    const { data: products, deleteProduct, loading } = useProducts();

    const columns = React.useMemo(() => {
        return baseColumns.map((col) => {
            if (col.id === "actions") {
                return {
                    ...col,
                    cell: ({ row }: any) => {
                        const product = row.original;
                        return (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View</DropdownMenuItem>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="text-red-500"
                                        onClick={() => deleteProduct(product.id)}
                                        disabled={loading}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        );
                    },
                };
            }
            return col;
        });
    }, [deleteProduct]);

    return <DataTable columns={columns} data={products} emptyMessage="No meals available" />;
}
