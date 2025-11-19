import {API_BASE} from "@/lib/env";
import {Product, ProductPayload} from "@/types/product";
import {storage} from "@/lib/storage";

async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/api/products`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
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
    const json: any = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
}

async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
    });

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
    const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
        },
        body: JSON.stringify(product),
    });

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to create product`);
        }
        throw errorData;
    }

    const json = await res.json();
    return json.data;
}

async function updateProduct(id: string, product: ProductPayload): Promise<Product> {
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
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
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
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
