"use client";


import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import React from "react";
import ProductTable from "@/app/(protected)/products/components/product-table";

export default function Page() {
    return (
        <div className="flex flex-col p-4 min-h-min flex-1">
            <div className="mb-2 flex items-baseline justify-between gap-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                    <p className="text-muted-foreground">Manage your products</p>
                </div>
                <Button
                    className="ml-auto hidden h-8 lg:flex bg-primary text-white shadow-sm hover:text-white hover:bg-primary/90"
                >
                    <Plus/>
                    Add Product
                </Button>
            </div>

            <ProductTable />
        </div>
    )
}
