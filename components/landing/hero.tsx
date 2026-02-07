import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function Hero() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return (
        <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-24 text-center md:px-6">
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]"></div>

            <div className="container relative z-10 flex flex-col items-center gap-6">
                <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    Now Available in Beta
                </div>

                <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
                    Professional Image Editing <span className="text-primary">Powered by AI</span>
                </h1>

                <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
                    The ultimate SaaS platform for automated image processing. Resize, crop, and enhance your visuals instantly with our advanced AI algorithms and ImageKit integration.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 mt-8">
                    <Button size="lg" className="h-12 px-8 text-base" asChild>
                        <Link href={session ? "/dashboard" : "/auth/sign-up"}>
                            {session ? "Go to Dashboard" : "Start Editing for Free"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    {!session && (
                        <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                            <Link href="/auth/sign-in">
                                Login
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="mt-16 w-full max-w-5xl overflow-hidden rounded-xl border border-border bg-background/50 shadow-2xl backdrop-blur-sm">
                    <div className="w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-muted-foreground relative">
                        <img
                            src="/hero-section.png"
                            alt="AI Processing Dashboard"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
