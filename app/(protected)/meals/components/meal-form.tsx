"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "@/components/form-field";
import {MealFormValues, mealSchema} from "@/validations/meal.schema";

interface MealFormProps {
    defaultValues?: any;
    onSubmit: (data: MealFormValues) => void;
    loading?: boolean;
}

export function MealForm({ defaultValues, onSubmit, loading }: MealFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<MealFormValues>({
        resolver: zodResolver(mealSchema),
        defaultValues: defaultValues || {},
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
            <FormField id="name" label="Name" error={errors.name?.message}>
                <Input {...register("name")} placeholder="Meal name" />
            </FormField>

            <FormField id="description" label="Description" error={errors.description?.message}>
                <Textarea {...register("description")} placeholder="Meal description" />
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

            <FormField id="meal_type" label="Meal Type" error={errors.meal_type?.message}>
                <Select {...register("meal_type")}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>

            <FormField id="image" label="Image URL" error={errors.image?.message}>
                <Input {...register("image")} placeholder="https://example.com/image.jpg" />
            </FormField>

            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Meal"}
            </Button>
        </form>
    );
}
