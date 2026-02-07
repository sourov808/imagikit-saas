"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function SignOutButton() {
    const router = useRouter()

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
        <Button variant="destructive" onClick={handleSignOut}>
            Sign Out
        </Button>
    )
}
