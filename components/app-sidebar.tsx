"use client"

import * as React from "react"
import {
    Blocks,
    HandPlatterIcon,
    LayoutDashboardIcon, ShoppingCart,
    Users,
} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import {User} from "@/types/user"
import {storage} from "@/lib/storage";
import Link from "next/link";
import {ROUTES} from "@/lib/routes";
import Image from "next/image";

const navItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboardIcon,
        url: ROUTES.DASHBOARD,
    },
    {
        title: "Users",
        icon: Users,
        url: ROUTES.USERS.INDEX,
    },
    {
        title: "Meals",
        icon: HandPlatterIcon,
        url: ROUTES.MEALS.INDEX,
    },
    {
        title: "Meal Plans",
        icon: Blocks,
        url: ROUTES.MEAL_PLANS.INDEX,
    },
    {
        title: "Express Shop",
        icon: ShoppingCart,
        items: [
            {
                title: "Categories",
                url: ROUTES.CATEGORIES.INDEX
            },
            {
                title: "Products",
                url: ROUTES.PRODUCTS.INDEX
            },
        ]
    },
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
            <SidebarHeader className="border-b px-4 py-4">
                <Link href={ROUTES.DASHBOARD} className="flex items-center justify-start">
                    <div className="relative h-12 w-full">
                        <Image
                            src="https://obtmksfewry4ishp.public.blob.vercel-storage.com/Logo/Logo-Fitnest-Vert-v412yUnhxctld0VkvDHD8wXh8H2GMQ.png"
                            alt="Fitnest Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems}/>
            </SidebarContent>

            <SidebarFooter className="border-t">
                <NavUser user={user}/>
            </SidebarFooter>

            <SidebarRail/>
        </Sidebar>
    )
}
