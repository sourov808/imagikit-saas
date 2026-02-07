
"use client";

import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Copy, Trash2, Edit } from "lucide-react";

interface Project {
    id: string;
    name: string | null;
    imageUrl: string;
    filePath: string;
    transformations?: any;
    createdAt: Date;
}

export default function ProjectCard({ project }: { project: Project }) {
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-none bg-muted/40">
            <div className="relative aspect-video overflow-hidden">
                <IKImage
                    urlEndpoint={urlEndpoint}
                    path={project.filePath}
                    transformation={project.transformations ? (Array.isArray(project.transformations) ? project.transformations : [project.transformations]) : [{ height: "300", width: "400" }]}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    alt={project.name || "Project Image"}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Link href={`/dashboard/projects/${project.id}`} className="bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full text-white transition">
                        <Edit className="w-5 h-5" />
                    </Link>
                </div>
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold truncate text-lg">{project.name || "Untitled"}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                    {new Date(project.createdAt).toLocaleDateString()}
                </p>
            </CardContent>
        </Card>
    );
}
