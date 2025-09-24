import { API_BASE } from "@/lib/env";
import { ensureCsrf } from "@/lib/csrf";
import { getCookie } from "@/lib/cookies";
import {Product, ProductPayload} from "@/types/product";

async function getProducts(): Promise<Product[]> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/products`, {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch products");
    const json: any = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
}

async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error(`Failed to fetch product with id ${id}`);
    const json: any = await res.json();
    return json.data;
}

async function createProduct(product: ProductPayload): Promise<Product> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        credentials: "include", // ✅ important
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
        body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Failed to create product");
    const json = await res.json();
    return json.data;
}

async function updateProduct(id: string, product: Product): Promise<Product> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "PUT",
        credentials: "include", // ✅ important
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
        body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error(`Failed to update product with id ${id}`);
    const json = await res.json();
    return json.data;
}

async function deleteProduct(id: string): Promise<void> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
    });
    if (!res.ok) throw new Error(`Failed to delete product with id ${id}`);
}

export const productService = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
