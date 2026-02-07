"use server"

import db from "@/db"
import { user } from "@/db/schema"
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"

export const getUserCredit = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        return null
    }

    const [userInfo] = await db.select().from(user).where(eq(user.id, session.user.id))
    return userInfo?.credit ?? null;
}