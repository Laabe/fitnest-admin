"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/form-field";
import { User } from "@/types/user";
import { UserFromValues, UserSchema } from "@/validations/user.schema";

interface UserFormProps {
    defaultValues?: Partial<User>;
    onSubmit: (data: UserFromValues) => void;
    loading?: boolean;
}

export function UserForm({ defaultValues, onSubmit, loading }: UserFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFromValues>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: defaultValues?.name || "",
            email: defaultValues?.email || "",
            role: defaultValues?.role || "admin",
        },
    });

    const isEdit = Boolean(defaultValues?.id);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
            <FormField id="name" label="Name" error={errors.name?.message}>
                <Input {...register("name")} placeholder="Full Name" />
            </FormField>

            <FormField id="email" label="Email" error={errors.email?.message}>
                <Input {...register("email")} placeholder="Email" />
            </FormField>

            <FormField id="role" label="Role" error={errors.role?.message}>
                <Input {...register("role")} readOnly value="admin" />
            </FormField>

            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : isEdit ? "Update User" : "Create User"}
            </Button>
        </form>
    );
}
