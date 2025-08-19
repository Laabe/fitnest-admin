"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/form-field";
import { MealPlanFormValues, mealPlanSchema } from "@/validations/meal-plan.schema";
import { MealPlan } from "@/types/meal-plan";
import {MultiSelect} from "@/components/multi-select-input";
import {Meal} from "@/types/meal";

interface MealPlanFormProps {
    defaultValues?: MealPlan;
    onSubmit: (data: MealPlanFormValues) => void;
    loading?: boolean;
    availableMeals: Meal[];
}

export function MealPlanForm({
                                 defaultValues,
                                 onSubmit,
                                 loading,
                                 availableMeals,
                             }: MealPlanFormProps) {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MealPlanFormValues>({
        resolver: zodResolver(mealPlanSchema),
        defaultValues: {
            name: defaultValues?.name || "",
            description: defaultValues?.description || "",
            meals: defaultValues?.meals.map((m) => m.id) || [],
        },
    });

    console.log(defaultValues?.meals.map((m) => m.id))
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
            <FormField id="name" label="Name" error={errors.name?.message}>
                <Input {...register("name")} />
            </FormField>

            <FormField id="description" label="Description" error={errors.description?.message}>
                <Textarea {...register("description")} />
            </FormField>

            <Controller
                name="meals"
                control={control}
                render={({ field }) => (
                    <FormField id="meals" label="Meals" error={errors.meals?.message}>
                        <MultiSelect
                            options={availableMeals
                                .filter((meal): meal is Meal & { id: string } => typeof meal.id === "string")
                                .map((meal) => ({
                                    label: meal.name,
                                    value: meal.id,
                                }))}
                            selected={field.value}
                            onChange={field.onChange}
                            placeholder="Select meals"
                            emptyMessage="No meals found"
                        />
                    </FormField>
                )}
            />

            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Meal Plan"}
            </Button>
        </form>
    );
}
