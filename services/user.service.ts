import { API_BASE } from "@/lib/env";
import { ensureCsrf } from "@/lib/csrf";
import { getCookie } from "@/lib/cookies";
import {User} from "@/types/user";

async function getAllUsers(): Promise<User[]> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/users`, {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch users");
    const json: any = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
}

async function getUserById(id: string): Promise<User> {
    const res = await fetch(`${API_BASE}/api/users/${id}`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error(`Failed to fetch user with id ${id}`);
    const json: any = await res.json();
    return json.data;
}

async function createUser(user: User): Promise<User> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/users`, {
        method: "POST",
        credentials: "include", // ✅ important
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
        body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error("Failed to create user");
    const json = await res.json();
    return json.data;
}

async function editUser(id: string, user: User): Promise<User> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/users/${id}`, {
        method: "PUT",
        credentials: "include", // ✅ important
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
        body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error(`Failed to update user with id ${id}`);
    const json = await res.json();
    return json.data;
}

async function deleteUser(id: string): Promise<void> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/users/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": xsrf,
        },
    });
    if (!res.ok) throw new Error(`Failed to delete user with id ${id}`);
}

export const userService = {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
};
