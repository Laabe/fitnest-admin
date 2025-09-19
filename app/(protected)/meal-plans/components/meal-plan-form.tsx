"use client"

import React, {useCallback, useMemo, useRef, useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Checkbox} from "@/components/ui/checkbox"
import {Badge} from "@/components/ui/badge"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {
    BookOpen,
    Check,
    Image as ImageIcon,
    Upload,
    X,
    Search,
    ChevronsUpDown,
    Calendar,
    Clock,
    Utensils,
    DollarSign,
    Star,
} from "lucide-react"
import {cn} from "@/lib/utils"
import {MealPlan} from "@/types/meal-plan"
import {Controller, useForm} from "react-hook-form"
import {MealPlanFormValues, mealPlanSchema} from "@/validations/meal-plan.schema"
import {zodResolver} from "@hookform/resolvers/zod"
import {FormField} from "@/components/form-field"
import {Meal} from "@/types/meal"
import {useMealPlans} from "@/hooks/useMealPlans";

interface MealPlanFormProps {
    defaultValues?: Partial<MealPlanFormValues>
    recipes?: Meal[]
}

export function MealPlanForm({ defaultValues, recipes }: MealPlanFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {addMealPlan} = useMealPlans();

    const {
        watch,
        control,
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<MealPlanFormValues>({
        resolver: zodResolver(mealPlanSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            photo: null,
            snacks: {
                included: false,
                price: 0,
            },
            meals: {
                breakfast: {
                    included: false,
                    price: 0,
                    recipes: [],
                },
                lunch: {
                    included: false,
                    price: 0,
                    recipes: [],
                },
                dinner: {
                    included: false,
                    price: 0,
                    recipes: [],
                },
            },
            billingPeriod: {
                monthly: false,
                weekly: false,
            },
            ...defaultValues,
        },
    })

    const [dragActive, setDragActive] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileUpload = (file: File | null) => {
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => setImagePreview((e.target?.result as string) ?? null)
            reader.readAsDataURL(file)
        } else {
            setImagePreview(null)
        }
    }

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
        else if (e.type === "dragleave") setDragActive(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const file = e.dataTransfer.files?.[0]
        if (file && file.type.startsWith("image/")) {
            handleFileUpload(file)
            setValue("photo", file, { shouldValidate: true })
        }
    }, [setValue])

    const removeImage = () => {
        handleFileUpload(null)
        setValue("photo", null, { shouldValidate: true })
        fileInputRef.current?.focus()
    }

    const onSubmit = async (data: MealPlanFormValues) => {
        setIsSubmitting(true)
        try {
            await addMealPlan(data)
        } catch (error) {
            console.error("Failed to add meal plan:", error)
        }
        finally {
            setIsSubmitting(false)
        }
    }

    const toggleRecipe = (mealType: keyof MealPlan["meals"], recipeId: string) => {
        const current = watch(`meals.${mealType}.recipes`) || []
        if (current.includes(recipeId)) {
            setValue(
                `meals.${mealType}.recipes`,
                current.filter((r: string) => r !== recipeId),
                { shouldDirty: true, shouldValidate: true },
            )
        } else {
            setValue(
                `meals.${mealType}.recipes`,
                [...current, recipeId],
                { shouldDirty: true, shouldValidate: true },
            )
        }
    }

    const periods = [
        { key: "monthly", label: "Monthly", desc: "Billed every month", icon: <Calendar className="w-4 h-4" /> },
        { key: "weekly", label: "Weekly", desc: "Billed every week", icon: <Clock className="w-4 h-4" /> },
    ] as const

    const dayMeals = [
        { key: "breakfast", label: "Breakfast", desc: "Start your day right" },
        { key: "lunch", label: "Lunch", desc: "Midday fuel" },
        { key: "dinner", label: "Dinner", desc: "Evening satisfaction" },
    ] as const

    const snacksIncluded = watch("snacks.included")
    const breakfastIncluded = watch("meals.breakfast.included")
    const lunchIncluded = watch("meals.lunch.included")
    const dinnerIncluded = watch("meals.dinner.included")

    const dailyTotal = useMemo(() => {
        let total = 0
        if (snacksIncluded) total += Number(watch("snacks.price") || 0)
        if (breakfastIncluded) total += Number(watch("meals.breakfast.price") || 0)
        if (lunchIncluded) total += Number(watch("meals.lunch.price") || 0)
        if (dinnerIncluded) total += Number(watch("meals.dinner.price") || 0)
        return total
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        snacksIncluded,
        breakfastIncluded,
        lunchIncluded,
        dinnerIncluded,
        watch("snacks.price"),
        watch("meals.breakfast.price"),
        watch("meals.lunch.price"),
        watch("meals.dinner.price")
    ])

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
            <div className="mx-auto px-4 py-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-8">
                        {/* Basic Information */}
                        <Card className="bg-card/95 backdrop-blur-sm">
                            <CardHeader className="pb-6">
                                <CardTitle className="flex items-center gap-3 text-2xl">
                                    <BookOpen className="w-6 h-6" />
                                    Basic Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField id="name" label="Meal Plan Name" error={errors.name?.message}>
                                    <Input placeholder="e.g., Weekly Family Meal Plan" className="h-12 text-base" {...register("name")} />
                                </FormField>

                                <FormField id="description" label="Description" error={errors.description?.message}>
                                    <Textarea
                                        placeholder="Describe your meal plan goals, dietary preferences, or special requirements..."
                                        className="min-h-[120px] text-base leading-relaxed resize-none"
                                        {...register("description")}
                                    />
                                </FormField>

                                <FormField id="photo" label="Cover Photo (Optional)" error={errors.photo?.message}>
                                    <div className="space-y-4">
                                        {imagePreview ? (
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-muted-foreground">Preview</Label>
                                                <div className="relative group">
                                                    <div className="border-2 border-dashed border-border rounded-xl overflow-hidden bg-muted/30">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={imagePreview || "/placeholder.svg"}
                                                            alt="Meal plan preview"
                                                            className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={removeImage}
                                                            className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className={cn(
                                                    "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer",
                                                    dragActive
                                                        ? "border-primary bg-primary/10 scale-105"
                                                        : "border-border bg-muted/30 hover:bg-muted/50 hover:border-primary/50",
                                                )}
                                                onDragEnter={handleDrag}
                                                onDragLeave={handleDrag}
                                                onDragOver={handleDrag}
                                                onDrop={handleDrop}
                                                onClick={() => fileInputRef.current?.click()}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click() }}
                                                aria-label="Upload a cover photo"
                                            >
                                                <div className="space-y-4">
                                                    <div
                                                        className={cn(
                                                            "mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors",
                                                            dragActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                                                        )}
                                                    >
                                                        {dragActive ? <Upload className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
                                                    </div>
                                                    <div>
                                                        <p className={cn("text-base font-medium mb-1", dragActive ? "text-primary" : "text-foreground")}>
                                                            {dragActive ? "Drop your image here" : "Upload a cover photo"}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">Drag and drop an image, or click to browse</p>
                                                        <p className="text-xs text-muted-foreground mt-2">Supports JPG, PNG, GIF up to 10MB</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Use Controller for type=file to avoid controlled value warnings */}
                                        <Controller
                                            name="photo"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    ref={fileInputRef}
                                                    id="photo"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0] ?? null
                                                        field.onChange(file)
                                                        handleFileUpload(file)
                                                    }}
                                                    onBlur={field.onBlur}
                                                />
                                            )}
                                        />
                                    </div>
                                </FormField>
                            </CardContent>
                        </Card>

                        {/* Meals & Pricing */}
                        <Card className="bg-card/95 backdrop-blur-sm">
                            <CardHeader className="pb-6">
                                <CardTitle className="flex items-center gap-3 text-2xl">
                                    <Utensils className="w-6 h-6" />
                                    Meals & Pricing
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                {/* Snacks Section */}
                                <Card className="border border-border/50 bg-muted/30">
                                    <CardContent className="p-6">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <Controller
                                                name="snacks.included"
                                                control={control}
                                                render={({ field }) => (
                                                    <Checkbox
                                                        id="snacks.included"
                                                        checked={!!field.value}
                                                        onCheckedChange={(checked) => field.onChange(checked === true)}
                                                        className="w-5 h-5"
                                                    />
                                                )}
                                            />
                                            <div className="flex items-center gap-2">
                                                <Label htmlFor="snacks.included" className="text-base font-semibold">
                                                    Include Snacks
                                                </Label>
                                            </div>
                                        </div>

                                        {snacksIncluded && (
                                            <div className="ml-8 animate-in slide-in-from-left-2 duration-300">
                                                <FormField id="snacks.price" label="Daily Snack Price ($)" error={errors.snacks?.price?.message}>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                        <Input
                                                            placeholder="0.00"
                                                            type="number"
                                                            step="0.01"
                                                            className="h-12 text-base pl-10"
                                                            {...register("snacks.price", { valueAsNumber: true })}
                                                        />
                                                    </div>
                                                </FormField>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Daily Meals */}
                                <div className="space-y-4">
                                    <Label className="text-lg font-semibold flex items-center gap-2">
                                        <Utensils className="w-5 h-5" />
                                        Daily Meals
                                    </Label>
                                    <div className="grid gap-4">
                                        {dayMeals.map((meal) => {
                                            const included = watch(`meals.${meal.key}.included`)
                                            const mealKey = meal.key as keyof MealPlanPlanMeals
                                            const mealErrors = errors.meals?.[mealKey]

                                            return (
                                                <Card key={meal.key} className="border border-border bg-card">
                                                    <CardContent className="p-6">
                                                        <div className="space-y-4">
                                                            <div className="flex items-center space-x-3">
                                                                <Controller
                                                                    name={`meals.${meal.key}.included`}
                                                                    control={control}
                                                                    render={({ field }) => (
                                                                        <Checkbox
                                                                            id={`meals.${meal.key}.included`}
                                                                            checked={!!field.value}
                                                                            onCheckedChange={(checked) => field.onChange(checked === true)}
                                                                            className="w-5 h-5"
                                                                        />
                                                                    )}
                                                                />
                                                                <div className="flex items-center gap-3">
                                                                    <div>
                                                                        <Label htmlFor={`meals.${meal.key}.included`} className="text-base font-semibold cursor-pointer">
                                                                            {meal.label}
                                                                        </Label>
                                                                        <p className="text-sm text-muted-foreground">{meal.desc}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {included && (
                                                                <div className="ml-8 space-y-4 animate-in slide-in-from-left-2 duration-300">
                                                                    <FormField id={`${meal.key}.price`} label="Price per day ($)" error={mealErrors?.price?.message}>
                                                                        <div className="relative">
                                                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                                            <Input
                                                                                placeholder="0.00"
                                                                                type="number"
                                                                                step="0.01"
                                                                                className="h-11 pl-10"
                                                                                {...register(`meals.${meal.key}.price`, { valueAsNumber: true })}
                                                                            />
                                                                        </div>
                                                                    </FormField>

                                                                    {/* Recipe Selection Dropdown */}
                                                                    <div className="space-y-2">
                                                                        <Label className="text-sm font-medium">Select Recipes</Label>
                                                                        <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                <Button variant="outline" role="combobox" className="w-full justify-between h-11 text-left font-normal bg-background">
                                                                                    <div className="flex items-center gap-2">
                                                                                        <Search className="w-4 h-4 text-muted-foreground" />
                                                                                        <span className="text-muted-foreground">Search and select {meal.label.toLowerCase()} recipes...</span>
                                                                                    </div>
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="w-full p-0" align="start">
                                                                                <Command>
                                                                                    <CommandInput placeholder={`Search ${meal.label.toLowerCase()} recipes...`} className="h-11" />
                                                                                    <CommandList className="max-h-[300px]">
                                                                                        <CommandEmpty>No recipes found.</CommandEmpty>
                                                                                        <CommandGroup>
                                                                                            {recipes?.filter((r) => r.meal_type === meal.key).map((recipe) => {
                                                                                                const selectedRecipes = watch(`meals.${meal.key}.recipes`) || []
                                                                                                const isSelected = recipe.id ? selectedRecipes.includes(recipe.id) : false
                                                                                                return (
                                                                                                    <CommandItem
                                                                                                        key={recipe.id}
                                                                                                        value={recipe.name}
                                                                                                        onSelect={() => recipe.id && toggleRecipe(meal.key as keyof MealPlan["meals"], recipe.id)}
                                                                                                        className="flex items-center gap-3 cursor-pointer p-3"
                                                                                                    >
                                                                                                        <div className={cn("w-4 h-4 border border-primary rounded flex items-center justify-center", isSelected && "bg-primary")}
                                                                                                        >
                                                                                                            {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                                                                                                        </div>
                                                                                                        <div className="flex-1">
                                                                                                            <p className="font-medium">{recipe.name}</p>
                                                                                                            {recipe.description && (
                                                                                                                <p className="text-sm text-muted-foreground truncate">{recipe.description}</p>
                                                                                                            )}
                                                                                                        </div>
                                                                                                    </CommandItem>
                                                                                                )
                                                                                            })}
                                                                                        </CommandGroup>
                                                                                    </CommandList>
                                                                                </Command>
                                                                            </PopoverContent>
                                                                        </Popover>

                                                                        {/* Selected Recipes Display */}
                                                                        {(watch(`meals.${meal.key}.recipes`) || []).length > 0 && (
                                                                            <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                                                                                <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                                                                                    Selected Recipes {(watch(`meals.${meal.key}.recipes`) || []).length}
                                                                                </Label>
                                                                                <div className="flex flex-wrap gap-2">
                                                                                    {(watch(`meals.${meal.key}.recipes`) || []).map((recipeId: string) => {
                                                                                        const recipe = recipes?.find((r) => r.id === recipeId)
                                                                                        return (
                                                                                            <Badge key={recipeId} className="flex items-center gap-1 pr-1">
                                                                                                <span className="truncate max-w-[160px]">{recipe?.name || "Unknown Recipe"}</span>
                                                                                                <Button
                                                                                                    type="button"
                                                                                                    variant="ghost"
                                                                                                    size="sm"
                                                                                                    onClick={() => toggleRecipe(meal.key as keyof MealPlan["meals"], recipeId)}
                                                                                                    className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground ml-1"
                                                                                                >
                                                                                                    <X className="w-3 h-3" />
                                                                                                </Button>
                                                                                            </Badge>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Billing Period */}
                                <div className="space-y-4">
                                    <Label className="text-lg font-semibold flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        Billing Period
                                    </Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {periods.map((period) => (
                                            <Controller
                                                key={period.key}
                                                name={`billingPeriod.${period.key}` as const}
                                                control={control}
                                                render={({ field }) => (
                                                    <Card
                                                        className={cn(
                                                            "cursor-pointer transition-all duration-200 hover:shadow-md",
                                                            field.value ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/30",
                                                        )}
                                                    >
                                                        <CardContent className="p-4">
                                                            <div className="flex items-center space-x-3">
                                                                <Checkbox
                                                                    id={period.key}
                                                                    checked={!!field.value}
                                                                    onCheckedChange={(checked) => field.onChange(checked === true)}
                                                                    className="w-5 h-5"
                                                                />
                                                                <div className="flex items-center gap-2">
                                                                    {period.icon}
                                                                    <div>
                                                                        <Label htmlFor={period.key} className="text-base font-medium cursor-pointer">
                                                                            {period.label}
                                                                        </Label>
                                                                        <p className="text-sm text-muted-foreground">{period.desc}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                )}
                                            />
                                        ))}
                                    </div>
                                    {errors.billingPeriod && (
                                        <p className="text-destructive text-sm">{(errors.billingPeriod as any).message}</p>
                                    )}
                                </div>

                                {/* Price Summary */}
                                {(snacksIncluded || breakfastIncluded || lunchIncluded || dinnerIncluded) && (
                                    <Card className="bg-primary/5 border-primary/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-lg">Daily Total</h3>
                                                    <p className="text-sm text-muted-foreground">Price per day for selected meals</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-primary">${dailyTotal.toFixed(2)}</p>
                                                    <p className="text-sm text-muted-foreground">per day</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                <div className="flex justify-center">
                                    <Button type="submit" disabled={isSubmitting} size="lg" className="px-8 py-3 text-base font-semibold">
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                                                Creating Meal Plan...
                                            </>
                                        ) : (
                                            <>
                                                <Star className="w-5 h-5 mr-2" />
                                                Create Meal Plan
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </div>
        </div>
    )
}

// Helper type to safely index into errors.meals
// (kept at bottom to avoid cluttering the component logic)

type MealPlanPlanMeals = MealPlanFormValues["meals"];
