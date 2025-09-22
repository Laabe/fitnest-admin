"use client";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {User} from "@/types/user";
import {userService} from "@/services/user.service";

export function useUsers() {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAll();
    }, []);

    async function fetchAll() {
        try {
            setLoading(true);
            const users = await userService.getAllUsers();
            setData(users);
            setError(null);
        } catch {
            setError("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    }

    async function addUser(newUser: User) {
        try {
            const user = await userService.createUser(newUser);
            setData((prev) => [...prev, user]);
            toast("User added successfully!");
        } catch {
            toast("Failed to add user.");
        }
    }

    async function editUser(id: string, updatedUser: User) {
        try {
            const updated = await userService.editUser(id, updatedUser);
            setData((prev) =>
                prev.map((user) => (user.id === id ? { ...user, ...updated } : user))
            );
            toast("Category updated successfully!");
        } catch {
            toast("Failed to update category.");        }
    }

    async function deleteUser(id: string) {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await userService.deleteUser(id);
            setData((prev) => prev.filter((user) => user.id !== id));
            toast("User deleted successfully!");
        } catch {
            toast("Failed to delete user.");
        }
    }

    async function updateMyProfile(updatedUser: User) {
        try {
            setLoading(true);
            await userService.updateMyProfile(updatedUser);
        } catch {
            toast("Failed to update category.");
        } finally {
            setLoading(false);
            toast("Profile updated successfully!");
        }
    }

    async function getUser(id: string) {
        try {
            setLoading(true);
            return await userService.getUserById(id);
        } catch {
            setError("Failed to fetch user.");
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, addUser, editUser, deleteUser, getUser, updateMyProfile };
}
