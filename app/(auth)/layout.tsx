
import React from 'react'
import { Provider } from '@/components/providers/auth-provider'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider>
            <div className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
                <div className="relative hidden w-full flex-col bg-muted p-10 text-white dark:border-r md:flex lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-700 via-indigo-800 to-zinc-900 opacity-90" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.8))]" />
                    <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

                    <div className="relative z-20 flex items-center text-lg font-bold tracking-tight">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-8 w-8 text-primary-foreground"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        <span className="text-xl">Image SaaS</span>
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-xl font-medium leading-relaxed italic">
                                &ldquo;The AI-powered editing features completely transformed our workflow.
                                We're saving hours every week while delivering better quality images.&rdquo;
                            </p>
                            <footer className="text-base font-semibold text-primary-foreground/80">Sofia Davis, Creative Director</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="flex items-center justify-center py-12 px-4 sm:px-6 md:col-span-2 lg:col-span-1 lg:px-8">
                    {children}
                </div>
            </div>
        </Provider>
    )
}

export default AuthLayout
