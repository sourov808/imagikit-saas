import Link from "next/link"
import { Hexagon } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-background w-full flex items-center justify-center">
            <div className="container px-4 py-12 md:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 text-center md:text-left">
                    <div className="flex flex-col gap-4 items-center md:items-start">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                            <Hexagon className="h-6 w-6 text-primary" />
                            <span>Image SaaS</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            The complete image optimization and delivery platform for modern web applications.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">Features</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Changelog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">About</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Image SaaS. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
