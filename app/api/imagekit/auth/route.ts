
import imagekit from "@/lib/imagekit";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        return NextResponse.json(imagekit.getAuthenticationParameters());
    } catch (error) {
        console.error("ImageKit Auth Error:", error);
        return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
    }
}
