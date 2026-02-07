import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
    return (
        <section className="py-24 bg-primary text-primary-foreground w-full flex items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-6 px-4 text-center md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to get started?
                </h2>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed">
                    Join thousands of developers building the future of the web with our advanced image platform.
                </p>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                    <Button size="lg" variant="secondary" className="h-12 px-8" asChild>
                        <Link href="/auth/sign-up">Start Building for Free</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
                        <Link href="/contact">Contact Sales</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
