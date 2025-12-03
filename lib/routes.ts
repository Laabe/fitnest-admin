export const ROUTES = {
    DASHBOARD: "/dashboard",
    USERS: {
        INDEX: "/users",
        CREATE: "/users/new",
        EDIT: (id: string) => `/users/${id}/edit`,
        VIEW: (id: string) => `/users/${id}`,
    },
    MEALS: {
        INDEX: "/meals",
        CREATE: "/meals/new",
        EDIT: (id: string) => `/meals/${id}/edit`,
        CATEGORIES: "/meals/categories",
    },
    CATEGORIES: {
        INDEX: "/categories",
        CREATE: "/categories/new",
        EDIT: (id: string) => `/categories/${id}/edit`,
    },
    MEAL_PLANS: {
        INDEX: "/meal-plans",
        CREATE: "/meal-plans/new",
        EDIT: (id: string) => `/meal-plans/${id}/edit`,
    },
    PRODUCTS: {
        INDEX: "/products",
        CREATE: "/products/new",
        EDIT: (id: string) => `/products/${id}/edit`,
    },
}
