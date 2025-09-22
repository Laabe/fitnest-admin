"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/form-field";
import {User} from "@/types/user";
import {UserFromValues, UserSchema} from "@/validations/user.schema";

interface UserFormProps {
    defaultValues?: User;
    onSubmit: (data: User) => void;
    loading?: boolean;
}

export function UserForm({ defaultValues, onSubmit, loading }: UserFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFromValues>({
        resolver: zodResolver(UserSchema),
        defaultValues: defaultValues || {
            name: "",
            email: "",
            role: "admin"
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
            <FormField id="name" label="Name" error={errors.name?.message}>
                <Input {...register("name")} placeholder={"Full Name"}/>
            </FormField>

            <FormField id="email" label="Email" error={errors.email?.message}>
                <Input {...register("email")} placeholder={"Email"} />
            </FormField>

            <FormField id="role" label="Role" error={errors.role?.message}>
                <Input {...register("role")} readOnly value="admin" />
            </FormField>

            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Create User"}
            </Button>
        </form>
    );
}
