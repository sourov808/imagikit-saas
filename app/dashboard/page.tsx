
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/auth/sign-in");
    }

    // Projects fetching removed

    return (
        <div className="container mx-auto p-8 space-y-8 max-w-7xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Dashboard</h1>
                    <p className="text-muted-foreground mt-1 text-lg">Manage your creative projects.</p>
                </div>
                <Link href="/dashboard/create">
                    <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all">
                        <Plus className="w-5 h-5" />
                        New Project
                    </Button>
                </Link>
            </div>

            <Separator className="bg-border/40" />

            {/* Projects section removed as per request */}
            <div className="flex flex-col items-center justify-center min-h-[400px] border border-dashed rounded-xl bg-muted/20">
                <div className="flex flex-col items-center gap-4 text-center p-8">
                    <div className="p-6 rounded-full bg-primary/10">
                        <Plus className="w-12 h-12 text-primary" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-2xl">Create a new project</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto">
                            Start editing with our powerful AI tools.
                        </p>
                    </div>
                    <Link href="/dashboard/create">
                        <Button size="lg">Create Project</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
