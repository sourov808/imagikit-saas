"use client"

import * as React from "react"
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
import { LayoutDashboard, Plus, Images, Settings, LogOut, Zap, Crown } from "lucide-react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

import Credit from "./credit"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const router = useRouter()






    const navMain = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Create",
            url: "/dashboard/create",
            icon: Plus,
        },
        {
            title: "Projects",
            url: "/dashboard/projects",
            icon: Images,
        },
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: Settings,
        },
    ]

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/sign-in")
                    router.refresh()
                }
            }
        })
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Images className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Image SaaS</span>
                                    <span className="truncate text-xs">AI Editor</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navMain.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === item.url}
                                tooltip={item.title}
                                className={`${pathname === item.url ? "bg-sidebar-primary/80 text-sidebar-primary-foreground" : "cursor-pointer"}`}

                            >
                                <Link href={item.url} >
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>

                    <SidebarMenuItem className="space-y-4">
                        <Credit />

                        <SidebarMenuButton onClick={handleSignOut} tooltip="Log out" className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors">
                            <LogOut />
                            <span>Log out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
