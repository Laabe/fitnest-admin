export interface User {
    id: string,
    name: string,
    email: string,
    avatar?: string,
    role: string,
}

export interface UserPayload {
    name: string,
    email: string,
    avatar?: string,
    role: string,
}