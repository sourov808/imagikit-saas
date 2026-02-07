"use client";

import { AccountSettingsCards, SecuritySettingsCards } from "@daveyplate/better-auth-ui";

export default function SettingsPage() {
    return (
        <div className="flex flex-1 flex-col gap-8 p-4 pt-0">
            <h1 className="text-2xl font-bold">Settings</h1>
            <div className="w-full max-w-4xl space-y-8">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Account</h2>
                    <AccountSettingsCards className="w-full" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Security</h2>
                    <SecuritySettingsCards className="w-full" />
                </div>
            </div>
        </div>
    )
}
