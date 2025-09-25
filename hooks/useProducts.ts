"use client";
import {useState} from "react";
import {Product, ProductPayload} from "@/types/product";
import {productService} from "@/services/product.service";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const getProduct = async (id: string) => {
        try {
            setLoading(true);
            const product = await productService.getProduct(id);
            setProduct(product);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to get product");
        } finally {
            setLoading(false);
        }
    };

    const getProducts = async () => {
        try {
            setLoading(true);
            const products = await productService.getProducts();
            setProducts(products);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to get products list");
        } finally {
            setLoading(false);
        }
    }

    const createProduct = async (product: ProductPayload): Promise<Product> => {
        try {
            setLoading(true);
            return await productService.createProduct(product)
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to create product");
        } finally {
            setLoading(false);
        }
    }

    const updateProduct = async (id: string, product: ProductPayload) => {
        try {
            setLoading(true);
            await productService.updateProduct(id, product);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            setLoading(true);
            await productService.deleteProduct(id);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to delete product");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        product,
        products,
        getProduct,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct
    };
}
