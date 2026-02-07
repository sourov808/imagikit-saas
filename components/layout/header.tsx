
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { User } from "lucide-react";
import db from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ModeToggle } from "@/components/mode-toggle";
import { LayoutDashboard, Settings, LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export async function Header() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    let currentCredits = 0;
    if (session?.user?.id) {
        try {
            const userRecord = await db.query.user.findFirst({
                where: eq(user.id, session.user.id),
                columns: { credit: true }
            });
            if (userRecord) {
                currentCredits = userRecord.credit;
            }
        } catch (error) {
            console.error("Error fetching credits:", error);
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl inline-block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            Image SaaS
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/#features" className="transition-colors hover:text-foreground/80 text-foreground/60">Features</Link>
                        {/* Pricing removed */}

                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full group">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 shadow-md group-hover:shadow-primary/20 bg-muted">
                                        <img
                                            src={session.user?.image || `https://api.dicebear.com/9.x/avataaars/svg?seed=${session.user?.email || 'user'}`}
                                            alt={session.user?.name || "User"}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background ring-1 ring-background/50"></span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
                                <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg mb-2">
                                    <div className="h-10 w-10 rounded-full overflow-hidden border border-border">
                                        <img
                                            src={session.user?.image || `https://api.dicebear.com/9.x/avataaars/svg?seed=${session.user?.email || 'user'}`}
                                            alt={session.user?.name || "User"}
                                            className="h-full w-full object-cover "
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-0.5 overflow-hidden">
                                        {session.user?.name && <p className="font-semibold text-sm truncate">{session.user.name}</p>}
                                        {session.user?.email && (
                                            <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                                                {session.user.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="px-2 py-1.5 mb-2">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                        <span>Credits</span>
                                        <span className="font-medium text-primary">{currentCredits} remaining</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(currentCredits, 100)}%` }}></div>
                                    </div>
                                </div>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link href="/dashboard" className="flex items-center gap-2">
                                        <LayoutDashboard className="h-4 w-4" />
                                        <span>Dashboard</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link href="/dashboard/settings" className="flex items-center gap-2">
                                        <Settings className="h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className="cursor-pointer text-destructive focus:text-destructive">
                                    <Link href="/auth/sign-out" className="flex items-center gap-2">
                                        <LogOut className="h-4 w-4" />
                                        <span>Log out</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/auth/sign-in">
                            <Button size="sm">
                                <User className="mr-2 h-4 w-4" />
                                Login
                            </Button>
                        </Link>
                    )}
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
