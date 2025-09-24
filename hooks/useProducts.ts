"use client";
import { useEffect, useState } from "react";
import {toast} from "sonner";
import {Product, ProductPayload} from "@/types/product";
import {productService} from "@/services/product.service";

export function useProducts() {
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            setLoading(true);
            const products = await productService.getProducts();
            setData(products);
            setError(null);
        } catch {
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    }

    async function createProduct(product: ProductPayload) {
        try {
            setLoading(true);
            await productService.createProduct(product);
        } catch (error) {
            console.log("Failed to create product", error);
            toast("Failed to add product.");
        } finally {
            toast("Product created successfully.");
            setLoading(false);
        }
    }

    async function updateProduct(id: string, product: Product) {
        try {
            const updated = await productService.updateProduct(id, product);
            setData((prev) =>
                prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
            );
            toast("Product updated successfully!");
        } catch {
            toast("Failed to update product.");        }
    }

    async function deleteProduct(id: string) {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await productService.deleteProduct(id);
            setData((prev) => prev.filter((item) => item.id !== id));
            toast("Product deleted successfully!");
        } catch {
            toast("Failed to delete product.");
        }
    }

    return {
        data,
        loading,
        error,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct
    };
}
