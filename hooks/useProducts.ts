"use client";
import {useState} from "react";
import {Product, ProductPayload} from "@/types/product";
import {productService} from "@/services/product.service";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getProduct = async (id: string) => {
        try {
            setLoading(true);
            const product = await productService.getProduct(id);
            setProduct(product);
        } catch (error) {
            console.log("Failed to get product", error);
        } finally {
            setLoading(false);
        }
    };

    const getProducts = async () => {
        try {
            setLoading(true);
            const products = await productService.getProducts();
            setProducts(products);
        } catch (error) {
            console.log(error);
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    }

    const createProduct = async (product: ProductPayload): Promise<Product | null> => {
        try {
            setLoading(true);
            return await productService.createProduct(product)
        } catch (error) {
            console.log("Failed to create product", error);
            return null
        } finally {
            setLoading(false);
        }
    }

    const updateProduct = async (id: string, product: Product) => {
        try {
            setLoading(true);
            await productService.updateProduct(id, product);
        } catch (error) {
            console.log("Failed to update product", error);
        } finally {
            setLoading(false);
        }
    }

    const deleteProduct = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            setLoading(true);
            await productService.deleteProduct(id);
        } catch (error) {
            console.log("Failed to delete product", error);
        } finally {
            setLoading(false);
        }
    }

    return {
        product,
        products,
        loading,
        error,
        getProduct,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct
    };
}
