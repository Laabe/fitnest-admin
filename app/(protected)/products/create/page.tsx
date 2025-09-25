"use client"

import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ProductFormValues } from "@/app/(protected)/products/validations/product.schema";
import {ProductForm} from "@/app/(protected)/products/components/product-form";

export default function CreatePage() {
    const router = useRouter();
    const { data: categories, loading: loadingCategory } = useCategories();
    const { createProduct, loading: loadingProduct } = useProducts();

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
        await createProduct(data);
        router.push("/products");
        toast.success("Product successfully created!");
    };

    return (
        <ProductForm
            mode="create"
            categoriesOptions={categoriesOptions}
            statusOptions={statusOptions}
            loading={loadingProduct || loadingCategory}
            onSubmit={handleSubmit}
        />
    );
}
