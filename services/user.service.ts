import { API_BASE } from "@/lib/env";
import {User, UserPayload} from "@/types/user";
import {storage} from "@/lib/storage";

async function getUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE}/users`, {
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
            throw new Error(`Failed to get users list`);
        }
        throw errorData;
    }
    const json: any = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
}

async function getUser(id: string): Promise<User> {
    const res = await fetch(`${API_BASE}/users/${id}`, {
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
            throw new Error(`Failed to get user`);
        }
        throw errorData;
    }

    const json: any = await res.json();
    return json.data;
}

async function createUser(user: UserPayload): Promise<User> {
    const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
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
    const res = await fetch(`${API_BASE}/users/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
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
    const res = await fetch(`${API_BASE}/users/${id}`, {
        method: "DELETE",
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
            throw new Error(`Failed to delete user`);
        }
        throw errorData;
    }
}

async function updateMyProfile(user: User): Promise<User> {
    const res = await fetch(`${API_BASE}/settings/profile`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storage.getToken()}`,
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
