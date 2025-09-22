"use client"

import * as React from "react"
import {
    Blocks,
    HandPlatterIcon,
    LayoutDashboardIcon,
    Users,
    Wheat
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {useUserStore} from "@/stores/user";
import {bootstrapUser} from "@/services/auth.service";
import {User} from "@/types/user";

const data = {
    navMain: [
        {
            title: "Dashboard",
            icon: LayoutDashboardIcon,
            url: "/dashboard",
        },
        {
            title: "Users",
            icon: Users,
            url: "/users",
        },
        {
            title: "Meals",
            icon: HandPlatterIcon,
            url: "/meals",
        },
        {
            title: "Categories",
            icon: Blocks,
            url: "/categories",
        },
        {
            title: "Meal Plans",
            icon: Blocks,
            url: "/meal-plans",
        },
        {
            title: "Products",
            icon: Wheat,
            url: "/products",
        },
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user : User | null = useUserStore((s) => s.user);

  React.useEffect(() => {
    // hydrate on first mount if is not present (e.g., on hard refresh)
    if (!user) {
      bootstrapUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
      <Sidebar variant={"inset"} {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="/">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <img
                        src="https://obtmksfewry4ishp.public.blob.vercel-storage.com/Logo/Logo-Fitnest-Vert-v412yUnhxctld0VkvDHD8wXh8H2GMQ.png"
                        alt="Image"
                        className="absolute inset-0 w-4/5 object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
  )
}