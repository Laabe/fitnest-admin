"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/form-field";
import {Category} from "@/types/category";
import {CategoryFormValues, categorySchema} from "@/validations/category.schema";

interface CategoryFormProps {
    defaultValues?: Category;
    onSubmit: (data: Category) => void;
    loading?: boolean;
}

export function CategoryForm({ defaultValues, onSubmit, loading }: CategoryFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: defaultValues || {
            name: "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
            <FormField id="name" label="Name" error={errors.name?.message}>
                <Input {...register("name")} />
            </FormField>

            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Meal"}
            </Button>
        </form>
    );
}
