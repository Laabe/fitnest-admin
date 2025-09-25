"use client"

import { useParams, useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { toast } from "sonner";
import { ProductFormValues } from "@/app/(protected)/products/validations/product.schema";
import {ProductForm} from "@/app/(protected)/products/components/product-form";
import {useEffect} from "react";
import {Product} from "@/types/product";
import {formatLaravelErrors} from "@/utils/formatLaravelErrors";

export default function EditPage() {
    const { id } = useParams();
    const router = useRouter();
    const { getProduct, updateProduct, product, loading } = useProducts();
    const { data: categories, loading: loadingCategory } = useCategories();

    useEffect(() => {
        if (id) getProduct(id as string);
    }, [id]);

    const categoriesOptions = categories.map((c) => ({
        label: c.name,
        value: c.id ?? "",
    }));

    const statusOptions = [
        { label: "Active", value: "active" },
        { label: "Draft", value: "draft" },
        { label: "Archived", value: "archived" },
    ];

    const handleSubmit = async (data: ProductFormValues) => {
        updateProduct(String(id), data)
            .then(() => {
                toast.success("Product successfully updated!");
                router.push(`/products/${id}`);
            })
            .catch((error: any) => {
                const messages: string[] = error.message?.split("\n") ?? ["Failed to update product!"];
                toast.error("Failed to update product", {
                    description: formatLaravelErrors(messages),
                });
            });
    };

    const mapProductToFormValues = (product: Product): ProductFormValues => {
        return {
            id: product.id,
            name: product.name,
            sku: product.sku,
            description: product.description,
            price: {
                base: product.price.base,
                discount: product.price.discount ?? 0,
            },
            stock_quantity: product.stock_quantity,
            status: product.status,
            category_id: product.category.id,
            images: product.images ?? [],
            variants: product.variants ?? [],
        };
    }

    if (!product) {
        return <div>Product not found</div>
    }

    return (
        <ProductForm
            mode="edit"
            initialValues={mapProductToFormValues(product)}
            categoriesOptions={categoriesOptions}
            statusOptions={statusOptions}
            loading={loading || loadingCategory}
            onSubmit={handleSubmit}
        />
    );
}
