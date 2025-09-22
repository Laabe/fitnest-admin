"use client";

import { User } from "@/types/user";
import { useForm } from "react-hook-form";
import {
    ProfileSettingsFormSchema,
    ProfileSettingsFormValues,
} from "@/app/(protected)/settings/profile/validations/profile-settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form-field";
import { Input } from "@/components/ui/input";

interface IProps {
    user: User | null;
}

export function ProfileSettingsForm({ user }: IProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileSettingsFormValues>({
        resolver: zodResolver(ProfileSettingsFormSchema),
        defaultValues: {
            name: user?.name ?? "",
            email: user?.email ?? "",
            role: user?.role ?? "admin",
        },
    });

    const { updateMyProfile, loading } = useUsers();

    const onSave = (data: ProfileSettingsFormValues) => {
        if (!user?.id) return;
        updateMyProfile({ ...user, ...data });
    };

    return (
        <form
            onSubmit={handleSubmit(onSave)}
            className="flex flex-col gap-4 p-4"
        >
            <FormField id="name" label="Name" error={errors.name?.message}>
                <Input {...register("name")} />
            </FormField>

            <FormField id="email" label="Email" error={errors.email?.message}>
                <Input {...register("email")} />
            </FormField>

            <FormField id="role" label="Role" error={errors.role?.message}>
                <Input {...register("role")} readOnly />
            </FormField>

            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
            </Button>
        </form>
    );
}
