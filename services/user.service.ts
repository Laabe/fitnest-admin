import { API_BASE } from "@/lib/env";
import { ensureCsrf } from "@/lib/csrf";
import { getCookie } from "@/lib/cookies";
import {User, UserPayload} from "@/types/user";

async function getUsers(): Promise<User[]> {
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

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to get users list`);
        }
        throw errorData;
    }
    const json: any = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
}

async function getUser(id: string): Promise<User> {
    const res = await fetch(
        `${API_BASE}/api/users/${id}`,
        {credentials: "include"}
    );

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to get user`);
        }
        throw errorData;
    }

    const json: any = await res.json();
    return json.data;
}

async function createUser(user: UserPayload): Promise<User> {
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

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to create user`);
        }
        throw errorData;
    }

    const json = await res.json();
    return json.data;
}

async function updateUser(id: string, user: UserPayload): Promise<User> {
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

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to update user`);
        }
        throw errorData;
    }

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

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to delete user`);
        }
        throw errorData;
    }
}

async function updateMyProfile(user: User): Promise<User> {
    await ensureCsrf();
    const xsrf = getCookie("XSRF-TOKEN") || "";
    const res = await fetch(`${API_BASE}/api/settings/profile`, {
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

    if (!res.ok) {
        let errorData: any;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Failed to update profile`);
        }
        throw errorData;
    }

    const json = await res.json();
    return json.data;
}

export const userService = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    updateMyProfile,
};
