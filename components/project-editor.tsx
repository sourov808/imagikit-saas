
"use client";

import { useState } from "react";
import { IKImage } from "imagekitio-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Download, Save, RotateCcw, Loader2 } from "lucide-react";
import { updateProject } from "@/actions/projects";
import { useRouter } from "next/navigation";

interface Project {
    id: string;
    name: string | null;
    imageUrl: string;
    filePath: string;
    transformations?: any;
}

export default function ProjectEditor({ project }: { project: Project }) {
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
    const router = useRouter();

    // Initial State from DB or Defaults
    const initialTransform = project.transformations || {};

    const [width, setWidth] = useState<string>(initialTransform.width || "");
    const [height, setHeight] = useState<string>(initialTransform.height || "");
    const [quality, setQuality] = useState<number>(initialTransform.quality || 80);
    const [blur, setBlur] = useState<number>(initialTransform.blur || 0);
    const [gray, setGray] = useState<boolean>(initialTransform.gray || false);
    const [rotate, setRotate] = useState<number>(initialTransform.rotate || 0);
    const [radius, setRadius] = useState<number>(initialTransform.radius || 0);
    const [overlayText, setOverlayText] = useState<string>(initialTransform.overlayText || "");
    const [bgRemove, setBgRemove] = useState<boolean>(initialTransform.bgRemove || false);

    const [saving, setSaving] = useState(false);
    const [downloading, setDownloading] = useState(false);

    // Construct transformation array for ImageKit 
    // ImageKit URL parameters reference: https://docs.imagekit.io/features/image-transformations
    const transformations: any[] = [];
    if (bgRemove) transformations.push({ raw: "bg-remove" });
    if (width) transformations.push({ width });
    if (height) transformations.push({ height });
    if (quality !== 80) transformations.push({ quality });
    if (blur > 0) transformations.push({ blur });
    if (gray) transformations.push({ grayscale: true });
    if (rotate > 0) transformations.push({ rotate });
    if (radius > 0) transformations.push({ radius });
    if (overlayText) transformations.push({ raw: `l-text,i-${overlayText},fs-50,co-white,l-end` });


    // Cost constants
    const COSTS = {
        DIMENSIONS: 10,
        QUALITY: 15,
        BLUR: 5,
        GRAYSCALE: 5,
        ROTATE: 5,
        ROUNDED: 5,
        OVERLAY: 10,
        BG_REMOVE: 20
    };

    const calculateCost = () => {
        let cost = 0;

        if (width !== initialTransform.width || height !== initialTransform.height) cost += COSTS.DIMENSIONS;
        if (quality !== (initialTransform.quality || 80)) cost += COSTS.QUALITY;
        if (blur !== (initialTransform.blur || 0)) cost += COSTS.BLUR;
        if (gray !== (initialTransform.gray || false)) cost += COSTS.GRAYSCALE;
        if (rotate !== (initialTransform.rotate || 0)) cost += COSTS.ROTATE;
        if (radius !== (initialTransform.radius || 0)) cost += COSTS.ROUNDED;
        if (overlayText !== (initialTransform.overlayText || "")) cost += COSTS.OVERLAY;
        if (bgRemove !== (initialTransform.bgRemove || false)) cost += COSTS.BG_REMOVE;

        return cost === 0 ? 1 : cost;
    };

    const currentCost = calculateCost();



    const handleSave = async () => {
        setSaving(true);
        try {
            // Save state to DB
            const transformState = {
                width,
                height,
                quality,
                blur,
                gray,
                rotate,
                radius,
                overlayText,
                bgRemove,
                cost: currentCost
            };

            await updateProject(project.id, {
                transformations: transformState
            });
            console.log("Saved successfully");
            router.refresh();
        } catch (err: any) {
            console.error("Failed to save", err);
            alert(err.message || "Failed to save. You might be out of credits.");
        } finally {
            setSaving(false);
        }
    };

    // ... (rest of the file) ...
    // Update the button text
    <Button className="flex-1 gap-2" onClick={handleSave} disabled={saving}>
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        <span>Save ({currentCost} Credits)</span>
    </Button>

    const handleDownload = async () => {
        setDownloading(true);
        try {
            // We need to fetch the image with current transformations
            // IKImage generates the URL, but we don't have direct access to it easily without ref or manual construction.
            // Let's construct a simple approximation or use the `ik.imagekit.io` URL pattern.

            // Correct way: use a ref on IKImage or construct URL using imagekit-javascript (not installed on client generally this way)
            // Easiest hack: Query selector for the image inside the container
            const imgConfig = document.querySelector('.ik-image-ref') as HTMLImageElement;
            if (!imgConfig) {
                console.error("Image element not found");
                return;
            }
            const currentUrl = imgConfig.src;

            const response = await fetch(currentUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${project.name || 'image'}-${Date.now()}.jpg`; // Defaulting to JPG or original extension usually
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.error("Download failed", err);
            alert("Failed to download image");
        } finally {
            setDownloading(false);
        }
    };

    const handleReset = () => {
        setWidth("");
        setHeight("");
        setQuality(80);
        setBlur(0);
        setGray(false);
        setRotate(0);
        setRadius(0);
        setOverlayText("");
        setBgRemove(false);
    };

    return (
        <div className="flex flex-1 h-full overflow-hidden bg-background">
            {/* Sidebar Controls */}
            <div className="w-80 border-r bg-card p-6 flex flex-col gap-6 overflow-y-auto z-10 shadow-xl scrollbar-thin">
                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold mb-1 truncate" title={project.name || "Untitled"}>{project.name || "Untitled"}</h2>
                    </div>
                    <p className="text-xs text-muted-foreground">ID: {project.id}</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>Dimensions (px)</Label>
                        <div className="flex gap-2">
                            <Input placeholder="W" value={width} onChange={(e) => setWidth(e.target.value)} type="number" />
                            <Input placeholder="H" value={height} onChange={(e) => setHeight(e.target.value)} type="number" />
                        </div>
                    </div>

                    <div className="space-y-4 border-t pt-4">
                        <div className="space-y-2">
                            <Label className="flex justify-between">
                                <span>Quality</span>
                                <span className="text-muted-foreground">{quality}%</span>
                            </Label>
                            <Slider
                                value={[quality]}
                                onValueChange={(v) => setQuality(v[0])}
                                min={10} max={100} step={1}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="flex justify-between">
                                <span>Blur</span>
                                <span className="text-muted-foreground">{blur}px</span>
                            </Label>
                            <Slider
                                value={[blur]}
                                onValueChange={(v) => setBlur(v[0])}
                                min={0} max={100} step={1}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="flex justify-between">
                                <span>Rotate</span>
                                <span className="text-muted-foreground">{rotate}°</span>
                            </Label>
                            <Slider
                                value={[rotate]}
                                onValueChange={(v) => setRotate(v[0])}
                                min={0} max={360} step={90}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="flex justify-between">
                                <span>Rounded Corners</span>
                                <span className="text-muted-foreground">{radius}</span>
                            </Label>
                            <Slider
                                value={[radius]}
                                onValueChange={(v) => setRadius(v[0])}
                                min={0} max={100} step={1}
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <Checkbox
                                id="gray"
                                checked={gray}
                                onCheckedChange={(c) => setGray(!!c)}
                            />
                            <Label htmlFor="gray">Grayscale</Label>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <Checkbox
                                id="bgRemove"
                                checked={bgRemove}
                                onCheckedChange={(c) => setBgRemove(!!c)}
                            />
                            <Label htmlFor="bgRemove">Remove Background</Label>
                        </div>

                        <div className="space-y-2 border-t pt-4">
                            <Label>Text Overlay</Label>
                            <Input
                                placeholder="Enter text..."
                                value={overlayText}
                                onChange={(e) => setOverlayText(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-auto flex flex-col gap-2 pt-4 border-t">
                    <div className="flex gap-2">
                        <Button className="flex-1 gap-2" onClick={handleSave} disabled={saving}>
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            <span>Save ({currentCost} Credits)</span>
                        </Button>
                        <Button variant="secondary" className="flex-1" onClick={handleDownload} disabled={downloading}>
                            {downloading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />}
                            Download
                        </Button>
                    </div>
                    <Button variant="ghost" onClick={handleReset} size="sm">
                        <RotateCcw className="w-3 h-3 mr-2" /> Reset Defaults
                    </Button>
                </div>
            </div>

            {/* Main Canvas */}
            <div className="flex-1 bg-muted/30 flex items-center justify-center p-10 overflow-hidden relative">
                <div className="relative w-full h-full max-w-[1200px] max-h-[800px] bg-checkerboard shadow-2xl rounded-sm overflow-hidden flex items-center justify-center">
                    <IKImage
                        urlEndpoint={urlEndpoint}
                        path={project.filePath}
                        transformation={transformations as any}
                        alt={project.name || "Project Image"}
                        className="ik-image-ref transition-all duration-300 ease-in-out"
                        loading="eager"
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
        </div>
    );
}
