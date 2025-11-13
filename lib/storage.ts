import {User} from "@/types/user";

const TOKEN_KEY = "access_token";

export const storage = {
    getToken(): string | null {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(TOKEN_KEY);
    },
    setToken(token: string) {
        localStorage.setItem(TOKEN_KEY, token);
    },
    clearToken() {
        localStorage.removeItem(TOKEN_KEY);
    },
    getUser(): User | null {
        if (typeof window === "undefined") return null;
        const userJson = localStorage.getItem("user");
        if (!userJson) return null;
        try {
            return JSON.parse(userJson) as User;
        } catch {
            return null;
        }
    },
    setUser(user: User) {
        localStorage.setItem("user", JSON.stringify(user));
    },
    clearUser() {
        localStorage.removeItem("user");
    }
};
