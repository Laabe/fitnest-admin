"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

interface NavItem {
    title: string
    icon: LucideIcon
    isActive?: boolean
    url?: string
    items?: {
        title: string
        url: string
    }[]
}

export function NavMain({
                            items,
                        }: {
    items: NavItem[]
}) {
    const pathname = usePathname()

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const isParentActive = item.url
                            ? pathname === item.url || pathname.startsWith(`${item.url}/`)
                            : false
                        const hasActiveChild = item.items?.some(
                            (subItem) =>
                                pathname === subItem.url ||
                                pathname.startsWith(`${subItem.url}/`)
                        )
                        const isActive = isParentActive || hasActiveChild

                        if (item.items && item.items.length > 0) {
                            return (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={isActive}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                className={`hover:bg-green-800/40 hover:text-white transition-colors ${
                                                    isActive ? "bg-green-800 text-white font-medium" : ""
                                                }`}
                                                aria-expanded={isActive}
                                            >
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((subItem) => {
                                                    const isSubActive =
                                                        pathname === subItem.url ||
                                                        pathname.startsWith(`${subItem.url}/`)
                                                    return (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                className={`hover:bg-sidebar-accent/40 transition-colors ${
                                                                    isSubActive
                                                                        ? "bg-sidebar-accent/80 border-l-2 border-primary"
                                                                        : ""
                                                                }`}
                                                            >
                                                                <Link
                                                                    href={subItem.url}
                                                                    aria-current={isSubActive ? "page" : undefined}
                                                                >
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    )
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            )
                        }

                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    className={`hover:bg-green-800/40 hover:text-white transition-colors ${
                                        isActive ? "bg-green-800 text-white font-medium" : ""
                                    }`}
                                >
                                    <Link
                                        href={item.url!}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
