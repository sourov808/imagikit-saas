
"use client";

import ImageUpload from "@/components/image-upload";
import { createProject } from "@/actions/projects";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleUploadSuccess = async (res: any) => {
        setLoading(true);
        try {
            await createProject({
                name: res.name || "Untitled Project",
                imagekitId: res.fileId,
                imageUrl: res.url,
                filePath: res.filePath,
            });
        } catch (error) {
            console.error("Failed to create project", error);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-8 max-w-4xl mx-auto w-full">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
                <p className="text-muted-foreground">Upload an image to start editing.</p>
            </div>

            <div className="bg-card border rounded-xl p-8 shadow-sm">
                <ImageUpload onSuccess={handleUploadSuccess} />
                {loading && <p className="mt-4 text-center text-muted-foreground animate-pulse">Creating project...</p>}
            </div>
        </div>
    )
}
