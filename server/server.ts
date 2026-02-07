"use server";
import { auth } from "@/lib/auth"

export const signIn = async () => {
    await auth.api.signInEmail({
        body: {
            email: "[EMAIL_ADDRESS]",
            password: "[PASSWORD]",
        }
    })
}
