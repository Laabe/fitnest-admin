"use client"

import React from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {BookOpen, DollarSign} from "lucide-react"
import {useForm} from "react-hook-form"
import {MealPlanFormValues, mealPlanSchema} from "@/validations/meal-plan.schema"
import {zodResolver} from "@hookform/resolvers/zod"
import {FormField} from "@/components/form-field"
import {useMealPlans} from "@/hooks/useMealPlans";
import {Dropzone} from "@/components/dropzone";
import {toast} from "sonner";
import {formatLaravelErrors} from "@/utils/formatLaravelErrors";
import {useRouter} from "next/navigation";

interface MealPlanFormProps {
    defaultValues?: MealPlanFormValues
}

export function MealPlanForm({defaultValues}: MealPlanFormProps) {
    const router = useRouter();
    const {addMealPlan, loading} = useMealPlans();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<MealPlanFormValues>({
        resolver: zodResolver(mealPlanSchema),
        mode: "onChange",
        defaultValues: defaultValues,
    })

    const onSubmit = async (data: MealPlanFormValues) => {
        await addMealPlan(data)
            .then(() => {
                router.push("/meal-plans")
                toast.success("Meal Plan successfully created!");
            })
            .catch(error => {
                const messages: string[] = error.message?.split("\n") ?? ["Failed to create meal plan!"];
                toast.error("Failed to create meal plan", {
                    description: formatLaravelErrors(messages),
                });
            });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
            <div className="mx-auto px-4 py-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-8 grid gap-6 grid-cols-3 items-start">
                        {/* Basic Information */}
                        <Card className="bg-card/95 backdrop-blur-sm col-span-2">
                            <CardHeader className="pb-6">
                                <CardTitle className="flex items-center gap-3 text-2xl">
                                    <BookOpen className="w-6 h-6"/>
                                    Basic Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField id="name" label="Meal Plan Name" error={errors.name?.message}>
                                    <Input placeholder="e.g., Weekly Family Meal Plan"
                                           className="h-12 text-base" {...register("name")} />
                                </FormField>

                                <FormField id="sku" label="SKU" error={errors.sku?.message}>
                                    <Input placeholder="e.g., SKU-####-####"
                                           className="h-12 text-base" {...register("sku")} />
                                </FormField>

                                <FormField id="description" label="Description" error={errors.description?.message}>
                                    <Textarea
                                        placeholder="Describe your meal plan goals, dietary preferences, or special requirements..."
                                        className="min-h-[215px] text-base leading-relaxed"
                                        {...register("description")}
                                    />
                                </FormField>

                                <FormField id="image" label="Cover Image" >
                                    <Dropzone multiple={false} />
                                </FormField>
                            </CardContent>
                        </Card>

                        {/* Pricing */}
                        <Card className="bg-card/95 backdrop-blur-sm col-span-1">
                            <CardHeader className="pb-6">
                                <CardTitle className="flex items-center gap-3 text-2xl">
                                    <DollarSign className="w-6 h-6"/>
                                    Pricing
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField id="breakfast_price_per_day" label="Breakfast"
                                           error={errors.breakfast_price_per_day?.message}>
                                    <Input
                                        placeholder="Price per day (e.g., 0.00 MAD)"
                                        className="h-12 text-base"
                                        {...register("breakfast_price_per_day", {valueAsNumber: true})}
                                    />
                                </FormField>
                                <FormField id="lunch_price_per_day" label="Lunch"
                                           error={errors.lunch_price_per_day?.message}>
                                    <Input
                                        placeholder="Price per day (e.g., 0.00 MAD)"
                                        className="h-12 text-base"
                                        {...register("lunch_price_per_day", {valueAsNumber: true})}
                                    />
                                </FormField>
                                <FormField id="dinner_price_per_day" label="Dinner"
                                           error={errors.dinner_price_per_day?.message}>
                                    <Input
                                        placeholder="Price per day (e.g., 0.00 MAD)"
                                        className="h-12 text-base"
                                        {...register("dinner_price_per_day", {valueAsNumber: true})}
                                    />
                                </FormField>
                                <FormField id="snack_price_per_day" label="Snack"
                                           error={errors.snack_price_per_day?.message}>
                                    <Input
                                        placeholder="Price per day (e.g., 0.00 MAD)"
                                        className="h-12 text-base"
                                        {...register("snack_price_per_day", {valueAsNumber: true})}
                                    />
                                </FormField>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex justify-start">
                        <Button type="submit" disabled={loading} size="lg"
                                className="px-8 py-3 text-base font-semibold">
                            {loading ? (
                                <>
                                    <div
                                        className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"/>
                                    Creating Meal Plan...
                                </>
                            ) : (
                                <>
                                    Create Meal Plan
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
