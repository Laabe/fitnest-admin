import {API_BASE} from "@/lib/env";
import {ensureCsrf} from "@/lib/csrf";
import {getCookie} from "@/lib/cookies";
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
    const res = await fetch(
        `${API_BASE}/api/products/${id}`,
        {credentials: "include"}
    );

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to get product with id ${id}`);
        }
        throw errorData;
    }

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

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to get products list`);
        }
        throw errorData;
    }

    const json = await res.json();
    return json.data;
}

async function updateProduct(id: string, product: ProductPayload): Promise<Product> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
        body: JSON.stringify(product),
    });

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to update product with id ${id}`);
        }
        throw errorData;
    }

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

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to delete product with id ${id}`);
        }
        throw errorData;
    }
}

export const productService = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
