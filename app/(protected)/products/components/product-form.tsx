"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductImageDropzone } from "@/components/image-dropzone";
import { Combobox } from "@/components/combobox";
import { ProductVariants } from "@/app/(protected)/products/components/product-variants-form";
import { Button } from "@/components/ui/button";
import { ProductFormValues, ProductSchema } from "@/app/(protected)/products/validations/product.schema";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProductFormProps {
    mode: "create" | "edit";
    initialValues?: ProductFormValues;
    categoriesOptions: { label: string; value: string }[];
    statusOptions: { label: string; value: string }[];
    loading?: boolean;
    onSubmit: (data: ProductFormValues) => Promise<void>;
}

export function ProductForm({
    mode,
    initialValues,
    categoriesOptions,
    statusOptions,
    loading,
    onSubmit,
 }: ProductFormProps) {
    const methods = useForm<ProductFormValues>({
        resolver: zodResolver(ProductSchema),
        defaultValues: initialValues || {
            name: "",
            description: "",
            sku: "",
            price: { base: 0, discount: 0 },
            status: "draft",
            category_id: "",
            stock_quantity: 0,
            images: [],
            variants: [],
        },
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = methods;

    // when `initialValues` changes (e.g., on edit load), update the form
    useEffect(() => {
        if (initialValues) reset(initialValues, { keepDirtyValues: true });
    }, [initialValues, reset]);

    return (
        <div className="w-2/3 mx-auto">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 mt-2 flex flex-col justify-between space-y-4 lg:flex-row lg:items-center lg:space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight">
                            {mode === "create" ? "Add Product" : "Edit Product"}
                        </h1>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="secondary"
                                disabled={loading}
                                onClick={() => reset()}
                            >
                                Discard
                            </Button>
                            <Button type="submit" disabled={loading}>
                                Save
                            </Button>
                        </div>
                    </div>

                    {/* Product fields */}
                    <div className="grid grid-cols-3 gap-4 items-start">
                        <div className="grid col-span-2 gap-4">
                            <Card>
                                <CardTitle className="px-5">Product Details</CardTitle>
                                <CardContent>
                                    <FormField id="name" label="name" error={errors.name?.message}>
                                        <Input
                                            placeholder="Enter product name..."
                                            {...register("name")}
                                        />
                                    </FormField>
                                    <FormField id="sku" label="sku" error={errors.sku?.message}>
                                        <Input
                                            placeholder="Enter product SKU..."
                                            {...register("sku")}
                                        />
                                    </FormField>
                                    <FormField
                                        id="description"
                                        label="description"
                                        error={errors.description?.message}
                                    >
                                        <Textarea
                                            className="mb-2"
                                            placeholder="Enter product description..."
                                            {...register("description")}
                                        />
                                        <p className="text-muted-foreground text-sm">
                                            Set a description to the product for better visibility.
                                        </p>
                                    </FormField>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardTitle className="px-5">Product Images</CardTitle>
                                <CardContent>
                                    <ProductImageDropzone />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardTitle className="px-5">Variants</CardTitle>
                                <CardContent>
                                    <ProductVariants />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar fields */}
                        <div className="grid gap-4">
                            <Card>
                                <CardTitle className="px-5">Pricing</CardTitle>
                                <CardContent>
                                    <FormField
                                        id="price.base"
                                        label="Base Price"
                                        error={errors.price?.base?.message}
                                    >
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            {...register("price.base", { valueAsNumber: true })}
                                        />
                                    </FormField>
                                    <FormField
                                        id="price.discount"
                                        label="Discounted Price"
                                        error={errors.price?.discount?.message}
                                    >
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            {...register("price.discount", { valueAsNumber: true })}
                                        />
                                    </FormField>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <FormField
                                        id="stock_quantity"
                                        label="Stock"
                                        error={errors.stock_quantity?.message}
                                    >
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            {...register("stock_quantity", { valueAsNumber: true })}
                                        />
                                    </FormField>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <FormField
                                        id="status"
                                        label="status"
                                        error={errors.status?.message}
                                    >
                                        <Controller
                                            name="status"
                                            control={control}
                                            render={({ field }) => (
                                                <Combobox
                                                    options={statusOptions}
                                                    placeholder="Select status..."
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                    </FormField>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <FormField
                                        id="category_id"
                                        label="Category"
                                        error={errors.category_id?.message}
                                    >
                                        <Controller
                                            name="category_id"
                                            control={control}
                                            render={({ field }) => (
                                                <Combobox
                                                    options={categoriesOptions}
                                                    placeholder="Select category..."
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                    </FormField>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
