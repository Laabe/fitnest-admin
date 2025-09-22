"use client";

import React from "react";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {FormField} from "@/components/form-field";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {ProductImageDropzone} from "@/components/image-dropzone";
import {Combobox} from "@/components/combobox";
import {useCategories} from "@/hooks/useCategories";
import {ProductVariants} from "@/app/(protected)/products/components/product-variants-form";

export default function Page() {

    const {data: categories} = useCategories()
    const categoriesOptions = categories.map((category) => ({
        label: category.name,
        value: category.id,
    }))

    const statusOptions = [
        {
            label: "Active",
            value: "active",
        },
        {
            label: "Draft",
            value: "draft",
        },
        {
            label: "Archived",
            value: "archived",
        }
    ]
    return (
        <div className="w-2/3 mx-auto">
            <div className="grid grid-cols-3 gap-4 items-start">
                <div className="grid col-span-2 gap-4">
                    <Card>
                        <CardTitle className={"px-5"}>Product Details</CardTitle>
                        <CardContent>
                            <FormField id={"name"} label={"name"} error={""}>
                                <Input placeholder={"Enter product name..."} />
                            </FormField>
                            <FormField id={"sku"} label={"sku"} error={""}>
                                <Input placeholder={"Enter product SKU..."} />
                            </FormField>
                            <FormField id={"description"} label={"description"} error={""}>
                                <Textarea placeholder={"Enter product description..."} />
                            </FormField>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardTitle className={"px-5"}>Product Images</CardTitle>
                        <CardContent>
                            <ProductImageDropzone/>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardTitle className={"px-5"}>Variants</CardTitle>
                        <CardContent>
                            <ProductVariants />
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4">
                    <Card>
                        <CardTitle className={"px-5"}>Pricing</CardTitle>
                        <CardContent>
                            <FormField id={"price.base"} label={"Base Price"} error={""}>
                                <Input type={"number"} placeholder={"0.00"} />
                            </FormField>
                            <FormField id={"price.discount"} label={"Discounted Price"} error={""}>
                                <Input placeholder={"0.00"} />
                            </FormField>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardTitle className={"px-5"}>Status</CardTitle>
                        <CardContent>
                            <Combobox options={statusOptions} placeholder={"Select status..."} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardTitle className={"px-5"}>Category</CardTitle>
                        <CardContent>
                            <Combobox options={categoriesOptions} placeholder={"Select category..."} />
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    )
}