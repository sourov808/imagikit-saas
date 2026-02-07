
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getProjectById } from "@/actions/projects";
import { IKImage } from "imagekitio-next"; // Verifying import
import ProjectEditor from "@/components/project-editor";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/auth/sign-in");
    }

    const { id } = await params;
    const project = await getProjectById(id);

    if (!project) {
        return notFound();
    }

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col">
            <ProjectEditor project={project} />
        </div>
    );
}
