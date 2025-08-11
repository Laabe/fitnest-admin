interface User {
    id: number,
    name: string,
    email: string,
    avatar?: string,
    role: string,
    user?: User | null
}