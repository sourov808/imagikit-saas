import { Wand2, Crop, ScanFace, ImagePlus, Zap, Layers } from "lucide-react"

const features = [
    {
        name: "Smart Cropping",
        description: "AI-powered cropping that automatically focuses on the most important part of your image.",
        icon: Crop,
    },
    {
        name: "Background Removal",
        description: "Instantly remove backgrounds from images with high precision using advanced AI models.",
        icon: ScanFace,
    },
    {
        name: "Auto Enhancement",
        description: "Automatically adjust brightness, contrast, and color levels for perfect results every time.",
        icon: Wand2,
    },
    {
        name: "Format Conversion",
        description: "Convert images to modern formats like WebP and AVIF for faster loading speeds.",
        icon: ImagePlus,
    },
    {
        name: "Real-time Processing",
        description: "Apply transformations on-the-fly with our high-performance global CDN.",
        icon: Zap,
    },
    {
        name: "Bulk Operations",
        description: "Process thousands of images simultaneously with our robust batch processing API.",
        icon: Layers,
    },
]

export function Features() {
    return (
        <section className="py-24 bg-muted/50 w-full flex items-center justify-center">
            <div className="container px-4 md:px-6 w-full">
                <div className="flex flex-col items-center justify-center gap-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Everything you need
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Powerful features to help you manage, optimize, and deliver your visual content.
                    </p>
                </div>

                {/* Scrollable Container */}
                <div className="relative w-full overflow-hidden">
                    <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
                        {features.map((feature) => (
                            <div
                                key={feature.name}
                                className="min-w-[280px] snap-center relative overflow-hidden rounded-xl border bg-background p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 text-center"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 mx-auto">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">{feature.name}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
