
"use server";

import db from "@/db";
import { projects, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc, and, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createProject(data: {
    name: string;
    imagekitId: string;
    imageUrl: string;
    filePath: string;
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) {
        throw new Error("Unauthorized");
    }

    const [newProject] = await db.insert(projects).values({
        id: crypto.randomUUID(),
        ...data,
        userId: session.user.id,
    }).returning();

    redirect(`/dashboard/projects/${newProject.id}`);
}

export async function getProjects() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) {
        return [];
    }

    const userProjects = await db.query.projects.findMany({
        where: eq(projects.userId, session.user.id),
        orderBy: [desc(projects.createdAt)],
    });

    return userProjects || [];
}

export async function getProjectById(id: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) {
        return null;
    }

    // Using findFirst instead of findMany for single item
    const project = await db.query.projects.findFirst({
        where: eq(projects.id, id),
    });

    if (project && project.userId !== session.user.id) {
        return null; // Unauthorized access
    }

    return project;
}

export async function updateProject(id: string, data: {
    imageUrl?: string;
    transformations?: any;
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) {
        throw new Error("Unauthorized");
    }

    // Check user credits
    const userRecord = await db.query.user.findFirst({
        where: eq(user.id, session.user.id),
        columns: {
            credit: true
        }
    });

    if (!userRecord || userRecord.credit < 1) {
        throw new Error("Insufficient credits");
    }

    await db.transaction(async (tx) => {
        // 1. Deduct Credit
        const [updatedUser] = await tx.update(user)
            .set({ credit: sql`${user.credit} - 1` })
            .where(and(eq(user.id, session.user.id), sql`${user.credit} > 0`))
            .returning({ credit: user.credit });

        if (!updatedUser) {
            throw new Error("Insufficient credits");
        }

        // 2. Update Project
        await tx.update(projects).set({
            ...data,
            updatedAt: new Date(),
        }).where(and(eq(projects.id, id), eq(projects.userId, session.user.id)));
    });

    revalidatePath(`/dashboard/projects/${id}`);
    revalidatePath(`/dashboard`);
}
