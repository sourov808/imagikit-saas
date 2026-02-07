"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Zap, Crown } from "lucide-react"
import { getUserCredit } from '@/actions/users'
import Upgrade from './upgrade'

const Credit = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [credit, setCredit] = useState<number>(0)

    useEffect(() => {
        const fetchCredit = async () => {
            try {
                const res = await getUserCredit()
                if (res) {
                    setCredit(res)
                }
            } catch (error) {
                console.error("Failed to fetch credits:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchCredit()
    }, [])

    return (
        <div className="bg-sidebar-accent/50 rounded-lg p-3">
            {loading ? (
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-1">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-5 w-12" />
                        </div>
                    </div>
                    <Skeleton className="h-9 w-full rounded-md" />
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            <Zap className="w-4 h-4 fill-current" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Available Credits</span>
                            <span className="font-bold text-lg leading-none">{credit}</span>
                        </div>
                    </div>
                    <Upgrade />
                </div>
            )}
        </div>
    )
}

export default Credit