"use client";
import {useState} from "react";
import {User, UserPayload} from "@/types/user";
import {userService} from "@/services/user.service";

export function useUsers() {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const getUser = async (id: string) => {
        try {
            setLoading(true);
            const user = await userService.getUser(id);
            setUser(user);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to get user");
        } finally {
            setLoading(false);
        }
    }

    const getUsers = async () => {
        try {
            setLoading(true);
            const users = await userService.getUsers();
            setUsers(users);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to get users list");
        } finally {
            setLoading(false);
        }
    }

    const createUser = async (user: UserPayload): Promise<User> => {
        try {
            setLoading(true);
            return await userService.createUser(user);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to create user");
        } finally {
            setLoading(false);
        }
    }

    const updateUser = async (id: string, user: UserPayload) => {
        try {
            setLoading(true);
            await userService.updateUser(id, user);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to update user");
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            setLoading(true);
            await userService.deleteUser(id);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to delete user");
        } finally {
            setLoading(false);
        }
    }

    async function updateMyProfile(updatedUser: User) {
        try {
            setLoading(true);
            await userService.updateMyProfile(updatedUser);
        } catch (err: any) {
            if (err.errors) {
                const messages = Object.values(err.errors).flat().join("\n");
                throw new Error(messages);
            }

            if (err.message) {
                throw new Error(err.message);
            }

            throw new Error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    }

    return {
        user,
        users,
        loading,
        getUser,
        getUsers,
        createUser,
        updateUser,
        deleteUser,
        updateMyProfile
    };
}
