"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import React from "react"
import Link from "next/link"

export function DashboardHeader() {
    const pathname = usePathname()

    // Split pathname, remove empty strings, and map to breadcrumb items
    const segments = pathname.split("/").filter(Boolean)

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {segments.map((segment, index) => {
                            const isLast = index === segments.length - 1
                            const href = `/${segments.slice(0, index + 1).join("/")}`
                            const title = segment.charAt(0).toUpperCase() + segment.slice(1)

                            return (
                                <React.Fragment key={href}>
                                    <BreadcrumbItem className="hidden md:block">
                                        {isLast ? (
                                            <BreadcrumbPage>{title}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link href={href}>{title}</Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                                </React.Fragment>
                            )
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}
