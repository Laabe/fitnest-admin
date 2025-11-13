"use client"

import * as React from "react"
import {
    Blocks,
    HandPlatterIcon,
    LayoutDashboardIcon,
    Users,
    Wheat
} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import {User} from "@/types/user"
import {storage} from "@/lib/storage";

const navItems = [
    {title: "Dashboard", icon: LayoutDashboardIcon, url: "/dashboard"},
    {title: "Users", icon: Users, url: "/users"},
    {title: "Meals", icon: HandPlatterIcon, url: "/meals"},
    {title: "Categories", icon: Blocks, url: "/categories"},
    {title: "Meal Plans", icon: Blocks, url: "/meal-plans"},
    {title: "Products", icon: Wheat, url: "/products"},
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
    const [user, setUser] = React.useState<User | null>(null)

    React.useEffect(() => {
        try {
            const storedUser = storage.getUser()
            if (storedUser) {
                setUser(storedUser)
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error)
        }
    }, [])

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/" className="relative block">
                                <img
                                    src="https://obtmksfewry4ishp.public.blob.vercel-storage.com/Logo/Logo-Fitnest-Vert-v412yUnhxctld0VkvDHD8wXh8H2GMQ.png"
                                    alt="Fitnest Logo"
                                    className="absolute inset-0 w-4/5 object-cover dark:brightness-[0.2] dark:grayscale"
                                />
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems}/>
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={user}/>
            </SidebarFooter>

            <SidebarRail/>
        </Sidebar>
    )
}
