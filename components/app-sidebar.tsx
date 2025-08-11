"use client"

import * as React from "react"
import {
  Apple,
  AudioWaveform,
  Command,
  GalleryVerticalEnd, HandPlatterIcon, Users,
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

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Users List",
          url: "#",
        },
        {
          title: "Create User",
          url: "#",
        },
      ],
    },
    {
      title: "Meals",
      url: "#",
      icon: HandPlatterIcon,
      isActive: true,
      items: [
        {
          title: "Meals List",
          url: "#",
        },
        {
          title: "Create Meal",
          url: "#",
        },
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: Apple,
      isActive: true,
      items: [
        {
          title: "Products List",
          url: "#",
        },
        {
          title: "Create Product",
          url: "#",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user : User | null = useUserStore((s) => s.user);

  React.useEffect(() => {
    // hydrate on first mount if is not present (e.g., on hard refresh)
    if (!user) bootstrapUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
      <Sidebar variant={"inset"} {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
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