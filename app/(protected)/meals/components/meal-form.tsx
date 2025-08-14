"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { mealSchema, MealFormValues } from "@/validations/meal.schema";
import { Meal } from "@/types/meal-type";
import {FormField} from "@/components/form-field";

interface MealFormProps {
    defaultValues?: Partial<Meal>;
    onSubmit: (data: MealFormValues) => void;
    loading?: boolean;
}

export function MealForm({ defaultValues, onSubmit, loading }: MealFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MealFormValues>({
        resolver: zodResolver(mealSchema),
        defaultValues: {
            name: defaultValues?.name ?? "",
            description: defaultValues?.description ?? "",
            image: defaultValues?.image ?? "",
            calories: defaultValues?.calories ?? 0,
            protein: defaultValues?.protein ?? 0,
            carbohydrates: defaultValues?.carbohydrates ?? 0,
            fats: defaultValues?.fats ?? 0,
            meal_type: defaultValues?.meal_type ?? "breakfast",
        },
        mode: "onSubmit",
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField id="name" label="Name" error={errors.name?.message}>
                <Input id="name" {...register("name")} />
            </FormField>

            <FormField id="description" label="Description" error={errors.description?.message}>
                <Input id="description" {...register("description")} />
            </FormField>

            <FormField id="image" label="Image URL" error={errors.image?.message}>
                <Input id="image" {...register("image")} />
            </FormField>

            <FormField id="calories" label="Calories" error={errors.calories?.message}>
                <Input
                    id="calories"
                    type="number"
                    step="any"
                    {...register("calories", { valueAsNumber: true })}
                />
            </FormField>

            <FormField id="protein" label="Protein" error={errors.protein?.message}>
                <Input
                    id="protein"
                    type="number"
                    step="any"
                    {...register("protein", { valueAsNumber: true })}
                />
            </FormField>

            <FormField id="carbohydrates" label="Carbohydrates" error={errors.carbohydrates?.message}>
                <Input
                    id="carbohydrates"
                    type="number"
                    step="any"
                    {...register("carbohydrates", { valueAsNumber: true })}
                />
            </FormField>

            <FormField id="fats" label="Fats" error={errors.fats?.message}>
                <Input
                    id="fats"
                    type="number"
                    step="any"
                    {...register("fats", { valueAsNumber: true })}
                />
            </FormField>

            <FormField id="meal_type" label="Meal Type" error={errors.meal_type?.message}>
                <select
                    id="meal_type"
                    {...register("meal_type")}
                    className="w-full p-2 border rounded"
                    defaultValue={defaultValues?.meal_type ?? "breakfast"}
                >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                </select>
            </FormField>

            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
            </Button>
        </form>
    );
}
