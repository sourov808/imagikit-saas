import {
    SignInForm,
    SignUpForm,
    RecoverAccountForm,
    ResetPasswordForm,
    TwoFactorForm,
    authLocalization
} from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui/server"
import { LogIn, UserPlus, ShieldCheck, KeyRound, Lock, Sparkles } from "lucide-react"

export const dynamicParams = false

export function generateStaticParams() {
    return Object.values(authViewPaths).map((path) => ({ path }))
}

export default async function AuthPage({ params }: { params: Promise<{ path: string }> }) {
    const { path } = await params

    let Component = null
    let Icon = null
    let iconColor = ""
    let title = ""
    let description = ""

    switch (path) {
        case authViewPaths.SIGN_IN:
            Component = SignInForm
            Icon = LogIn
            iconColor = "text-violet-600"
            title = "Welcome Back"
            description = "Enter your credentials to access your account"
            break
        case authViewPaths.SIGN_UP:
            Component = SignUpForm
            Icon = UserPlus
            iconColor = "text-pink-600"
            title = "create an Account"
            description = "Join us today and start your journey"
            break
        case authViewPaths.FORGOT_PASSWORD:
            Component = RecoverAccountForm
            Icon = KeyRound
            iconColor = "text-orange-500"
            title = "Forgot Password?"
            description = "No worries, we'll send you reset instructions"
            break
        case authViewPaths.RESET_PASSWORD:
            Component = ResetPasswordForm
            Icon = Lock
            iconColor = "text-blue-500"
            title = "Reset Password"
            description = "Enter your new password below"
            break
        case authViewPaths.TWO_FACTOR:
            Component = TwoFactorForm
            Icon = ShieldCheck
            iconColor = "text-green-600"
            title = "Two-Factor Auth"
            description = "Secure your account with 2FA"
            break
        default:
            Icon = Sparkles
            iconColor = "text-primary"
            title = "Authentication"
            description = "Please secure your session"
    }

    if (!Component) {
        return <div className="text-center text-muted-foreground">Auth View not found for path: {path}</div>
    }

    return (
        <main className="container flex grow flex-col items-center justify-center self-center p-4 md:p-6">
            <div className="w-full max-w-sm space-y-8">
                <div className="flex flex-col space-y-4 text-center items-center">
                    {Icon && (
                        <div className={`p-3 rounded-full bg-background border-2 border-border shadow-md ${iconColor}`}>
                            <Icon size={32} strokeWidth={2.5} />
                        </div>
                    )}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-extrabold tracking-tight capitalize">
                            {title}
                        </h1>
                        <p className="text-base text-muted-foreground font-medium">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="p-8 bg-card border rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                    <Component localization={authLocalization} redirectTo="/dashboard" />
                </div>

                <div className="text-center text-sm font-medium text-muted-foreground">
                    {path === authViewPaths.SIGN_IN && (
                        <p>
                            New to our platform?{" "}
                            <a href={`/auth/${authViewPaths.SIGN_UP}`} className="text-primary underline-offset-4 hover:underline decoration-2">
                                Create an account
                            </a>
                        </p>
                    )}
                    {path === authViewPaths.SIGN_UP && (
                        <p>
                            Already have an account?{" "}
                            <a href={`/auth/${authViewPaths.SIGN_IN}`} className="text-primary underline-offset-4 hover:underline decoration-2">
                                Sign in
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </main>
    )
}