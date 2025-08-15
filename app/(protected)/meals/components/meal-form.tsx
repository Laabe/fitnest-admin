"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Meal } from "@/types/meal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/form-field";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MealFormValues, mealSchema } from "@/validations/meal.schema";

interface MealFormProps {
    defaultValues?: Meal;
    onSubmit: (data: Meal) => void;
    loading?: boolean;
}

export function MealForm({ defaultValues, onSubmit, loading }: MealFormProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<MealFormValues>({
        resolver: zodResolver(mealSchema),
        defaultValues: defaultValues || {
            name: "",
            description: "",
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fats: 0,
            image: "",
            meal_type: "breakfast",
        },
    });

    const mealTypes = [
        { value: "breakfast", label: "Breakfast" },
        { value: "lunch", label: "Lunch" },
        { value: "dinner", label: "Dinner" },
        { value: "snack", label: "Snack" },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
            <FormField id="name" label="Name" error={errors.name?.message}>
                <Input {...register("name")} />
            </FormField>

            <FormField id="description" label="Description" error={errors.description?.message}>
                <Textarea {...register("description")} />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
                <FormField id="calories" label="Calories" error={errors.calories?.message}>
                    <Input type="number" {...register("calories", { valueAsNumber: true })} />
                </FormField>

                <FormField id="protein" label="Protein (g)" error={errors.protein?.message}>
                    <Input type="number" {...register("protein", { valueAsNumber: true })} />
                </FormField>

                <FormField id="carbohydrates" label="Carbs (g)" error={errors.carbohydrates?.message}>
                    <Input type="number" {...register("carbohydrates", { valueAsNumber: true })} />
                </FormField>

                <FormField id="fats" label="Fats (g)" error={errors.fats?.message}>
                    <Input type="number" {...register("fats", { valueAsNumber: true })} />
                </FormField>
            </div>

            <FormField id="image" label="Image URL" error={errors.image?.message}>
                <Input {...register("image")} />
            </FormField>

            {/* Meal Type Field fixed with Controller */}
            <FormField id="meal_type" label="Meal Type" error={errors.meal_type?.message}>
                <Controller
                    name="meal_type"
                    control={control}
                    defaultValue={defaultValues?.meal_type || "breakfast"}
                    render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select meal type" />
                            </SelectTrigger>
                            <SelectContent>
                                {mealTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
            </FormField>

            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Meal"}
            </Button>
        </form>
    );
}
