"use client"

import {Card, CardContent} from "@/components/ui/card";
import {ProfileSettingsForm} from "@/app/(protected)/settings/profile/components/Profile-settings-form";
import {User} from "@/types/user";
import {useUserStore} from "@/stores/user";

export default function Page() {
    const user : User | null = useUserStore((s) => s.user);


    return (
        <div className="flex flex-col p-4 min-h-min flex-1">
            <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your profile settings</p>
            {/* Add your profile settings components here */}

            <Card className="w-full max-w-2xl mt-4">
                <CardContent>
                    <ProfileSettingsForm user={user} />
                </CardContent>
            </Card>

        </div>
    )
}