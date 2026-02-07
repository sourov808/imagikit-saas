
const testimonials = [
    {
        quote: "This platform successfully handles our massive image library with ease. The AI features are a game changer.",
        author: "Sarah Chen",
        role: "CTO @ TechFlow",
        initials: "SC",
    },
    {
        quote: "We reduced our bandwidth costs by 40% just by switching to this service. Highly recommended!",
        author: "Mark Johnson",
        role: "Engineering Lead @ DevCorp",
        initials: "MJ",
    },
    {
        quote: "The best developer experience I've had with any image CDN. Integration was a breeze.",
        author: "Alex Rivera",
        role: "Frontend Architect @ CreativeStudio",
        initials: "AR",
    },
]

export function Testimonials() {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">
                    Trusted by developers
                </h2>
                <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                    {testimonials.map((testimonial, i) => (
                        <div key={i} className="flex flex-col justify-between p-6 bg-muted/30 rounded-lg border">
                            <blockquote className="text-lg text-muted-foreground mb-4">
                                &ldquo;{testimonial.quote}&rdquo;
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                    {testimonial.initials}
                                </div>
                                <div>
                                    <div className="font-semibold">{testimonial.author}</div>
                                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
