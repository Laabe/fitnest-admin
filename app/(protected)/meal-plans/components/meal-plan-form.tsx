"use client"

import React, {useCallback, useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Checkbox} from "@/components/ui/checkbox"
import {Badge} from "@/components/ui/badge"
import {ChefHat, Settings, BookOpen, Check, ChevronRight, ChevronLeft, ImageIcon, X, Upload} from "lucide-react"
import {cn} from "@/lib/utils"
import {Progress} from "@/components/ui/progress";

const steps = [
    {
        id: 1,
        title: "Meal Plan Details",
        icon: ChefHat,
        description: "Basic information about your meal plan",
    },
    {
        id: 2,
        title: "Meal Plan Settings",
        icon: Settings,
        description: "Configure your preferences and dietary requirements",
    },
    {
        id: 3,
        title: "Meal Plan Recipes",
        icon: BookOpen,
        description: "Select and customize your recipes",
    },
]

export function MealPlanForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const [dragActive, setDragActive] = useState(false)
    const [formData, setFormData] = useState({
        // Step 1 - Meal Plan Details
        name: "",
        description: "",
        photo: null as File | null,

        // Step 2 - Meal Plan Settings
        withSnack: false,
        snackPrice: "",
        period: {
            monthly: false,
            weekly: false,
        },
        meals: {
            breakfast: false,
            lunch: false,
            dinner: false,
        },
        mealPrices: {
            breakfast: "",
            lunch: "",
            dinner: "",
        },

        // Step 3 - Meal Plan Recipes
        selectedRecipes: [] as string[],
        customRecipes: "",
    })

    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const updateFormData = (field: string, value: any) => {
        setFormData((prev) => ({...prev, [field]: value}))
    }

    const updateMealData = (meal: string, field: "meals" | "mealPrices", value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                [meal]: value,
            },
        }))
    }

    const updatePeriodData = (period: string, value: boolean) => {
        setFormData((prev) => ({
            ...prev,
            period: {
                ...prev.period,
                [period]: value,
            },
        }))
    }

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSubmit = () => {
        console.log("Form submitted:", formData)
        // Handle form submission here
    }

    const handleFileUpload = (file: File | null) => {
        updateFormData("photo", file)
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            setImagePreview(null)
        }
    }

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            if (file.type.startsWith("image/")) {
                handleFileUpload(file)
            }
        }
    }, [])

    const removeImage = () => {
        handleFileUpload(null)
    }
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:min-w-[320px]">
                <Card className="sticky top-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold">Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {steps.map((step, index) => {
                                const Icon = step.icon
                                const isActive = currentStep === step.id
                                const isCompleted = currentStep > step.id

                                return (
                                    <div key={step.id} className="flex items-start relative">
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={cn(
                                                    "flex items-center justify-center w-12 h-12 rounded-xl border-2 transition-all duration-300 relative z-10 shadow-sm",
                                                    isActive && "border-primary bg-primary text-primary-foreground shadow-primary/25",
                                                    isCompleted &&
                                                    "border-secondary bg-secondary text-secondary-foreground shadow-secondary/25",
                                                    !isActive &&
                                                    !isCompleted &&
                                                    "border-border bg-background text-muted-foreground hover:border-primary/50",
                                                )}
                                            >
                                                {isCompleted ? <Check className="w-5 h-5"/> :
                                                    <Icon className="w-5 h-5"/>}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p
                                                    className={cn(
                                                        "text-sm font-semibold leading-tight",
                                                        isActive && "text-primary",
                                                        isCompleted && "text-secondary",
                                                        !isActive && !isCompleted && "text-muted-foreground",
                                                    )}
                                                >
                                                    {step.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                        {index < steps.length - 1 &&
                                            <div className="absolute left-6 top-12 w-0.5 h-8 bg-border z-0"/>}
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex-1">
                <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
                    <CardHeader className="pb-6">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            {(() => {
                                const Icon = steps[currentStep - 1].icon
                                return <Icon className="w-6 h-6 text-primary"/>
                            })()}
                            <span className="text-balance">{steps[currentStep - 1].title}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Step 1: Meal Plan Details */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-sm font-semibold">
                                        Plan Name
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g., Weekly Family Meal Plan"
                                        value={formData.name}
                                        onChange={(e) => updateFormData("name", e.target.value)}
                                        className="h-12 text-base"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="description" className="text-sm font-semibold">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe your meal plan goals, dietary preferences, or special requirements..."
                                        value={formData.description}
                                        onChange={(e) => updateFormData("description", e.target.value)}
                                        className="min-h-[120px] text-base leading-relaxed"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="photo" className="text-sm font-semibold">
                                        Cover Photo
                                    </Label>
                                    <div className="space-y-4">
                                        {imagePreview ? (
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-muted-foreground">Preview</Label>
                                                <div className="relative group">
                                                    <div className="border-2 border-dashed border-border rounded-xl overflow-hidden bg-muted/30">
                                                        <img
                                                            src={imagePreview || "/placeholder.svg"}
                                                            alt="Meal plan preview"
                                                            className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                                                        />
                                                        <Button
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
                                                onClick={() => document.getElementById("photo-input")?.click()}
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
                                                        <p
                                                            className={cn(
                                                                "text-base font-medium mb-1",
                                                                dragActive ? "text-primary" : "text-foreground",
                                                            )}
                                                        >
                                                            {dragActive ? "Drop your image here" : "Upload a cover photo"}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Drag and drop an image, or click to browse
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-2">Supports JPG, PNG, GIF up to 10MB</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <input
                                            id="photo-input"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                                            className="hidden"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Meal Plan Settings */}
                        {currentStep === 2 && (
                            <div className="space-y-8">
                                <div className="space-y-4 p-6 rounded-xl bg-muted/30 border border-border/50">
                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id="withSnack"
                                            checked={formData.withSnack}
                                            onCheckedChange={(checked) => updateFormData("withSnack", checked)}
                                            className="w-5 h-5"
                                        />
                                        <Label htmlFor="withSnack" className="text-base font-semibold">
                                            Include Snacks
                                        </Label>
                                    </div>

                                    <div className="ml-8 space-y-3">
                                        <Label htmlFor="snackPrice" className="text-sm font-medium">
                                            Snack Price ($)
                                        </Label>
                                        <Input
                                            id="snackPrice"
                                            type="number"
                                            placeholder="0.00"
                                            value={formData.snackPrice}
                                            onChange={(e) => updateFormData("snackPrice", e.target.value)}
                                            disabled={!formData.withSnack}
                                            className="h-11"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-base font-semibold">Billing Period</Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            {key: "monthly", label: "Monthly", desc: "Billed every month"},
                                            {key: "weekly", label: "Weekly", desc: "Billed every week"},
                                        ].map((period) => (
                                            <div
                                                key={period.key}
                                                className="p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <Checkbox
                                                        id={period.key}
                                                        checked={formData.period[period.key as keyof typeof formData.period]}
                                                        onCheckedChange={(checked) => updatePeriodData(period.key, checked as boolean)}
                                                        className="w-5 h-5"
                                                    />
                                                    <div>
                                                        <Label htmlFor={period.key}
                                                               className="text-base font-medium">
                                                            {period.label}
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">{period.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-base font-semibold">Meals & Pricing</Label>
                                    <div className="space-y-4">
                                        {[
                                            {key: "breakfast", label: "Breakfast"},
                                            {key: "lunch", label: "Lunch"},
                                            {key: "dinner", label: "Dinner"},
                                        ].map((meal) => (
                                            <div key={meal.key}
                                                 className="p-6 rounded-xl border border-border bg-card">
                                                <div className="space-y-4">
                                                    <div className="flex items-center space-x-3">
                                                        <Checkbox
                                                            id={meal.key}
                                                            checked={formData.meals[meal.key as keyof typeof formData.meals]}
                                                            onCheckedChange={(checked) => updateMealData(meal.key, "meals", checked)}
                                                            className="w-5 h-5"
                                                        />
                                                        <Label htmlFor={meal.key}
                                                               className="text-base font-medium flex items-center gap-2">
                                                            {meal.label}
                                                        </Label>
                                                    </div>

                                                    <div className="ml-8 space-y-2">
                                                        <Label htmlFor={`${meal.key}Price`}
                                                               className="text-sm font-medium">
                                                            Price per day
                                                        </Label>
                                                        <Input
                                                            id={`${meal.key}Price`}
                                                            type="number"
                                                            placeholder="0.00"
                                                            value={formData.mealPrices[meal.key as keyof typeof formData.mealPrices]}
                                                            onChange={(e) => updateMealData(meal.key, "mealPrices", e.target.value)}
                                                            disabled={!formData.meals[meal.key as keyof typeof formData.meals]}
                                                            className="h-11"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Meal Plan Recipes */}
                        {currentStep === 3 && (
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <Label className="text-base font-semibold">Popular Recipes</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            {name: "Grilled Chicken Salad", category: "Protein", emoji: "🥗"},
                                            {name: "Vegetable Stir Fry", category: "Vegetarian", emoji: "🥬"},
                                            {name: "Salmon with Quinoa", category: "Seafood", emoji: "🐟"},
                                            {name: "Pasta Primavera", category: "Pasta", emoji: "🍝"},
                                            {name: "Turkey Meatballs", category: "Protein", emoji: "🦃"},
                                            {name: "Roasted Vegetables", category: "Vegetarian", emoji: "🥕"},
                                        ].map((recipe) => (
                                            <div
                                                key={recipe.name}
                                                className="p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <Checkbox
                                                        id={recipe.name}
                                                        checked={formData.selectedRecipes.includes(recipe.name)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                updateFormData("selectedRecipes", [...formData.selectedRecipes, recipe.name])
                                                            } else {
                                                                updateFormData(
                                                                    "selectedRecipes",
                                                                    formData.selectedRecipes.filter((r) => r !== recipe.name),
                                                                )
                                                            }
                                                        }}
                                                        className="w-5 h-5"
                                                    />
                                                    <div className="flex-1">
                                                        <Label htmlFor={recipe.name}
                                                               className="text-base font-medium flex items-center gap-2">
                                                            <span>{recipe.emoji}</span>
                                                            {recipe.name}
                                                        </Label>
                                                        <p className="text-sm text-muted-foreground">{recipe.category}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {formData.selectedRecipes.length > 0 && (
                                    <div
                                        className="space-y-3 p-6 rounded-xl bg-secondary/10 border border-secondary/20">
                                        <Label className="text-base font-semibold text-secondary">
                                            Selected Recipes ({formData.selectedRecipes.length})
                                        </Label>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.selectedRecipes.map((recipe) => (
                                                <Badge key={recipe} variant="secondary"
                                                       className="px-3 py-1 text-sm">
                                                    {recipe}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <Label htmlFor="customRecipes" className="text-base font-semibold">
                                        Custom Recipe Requests
                                    </Label>
                                    <Textarea
                                        id="customRecipes"
                                        placeholder="Describe any specific recipes, dietary restrictions, or special requests you'd like to include in your meal plan..."
                                        value={formData.customRecipes}
                                        onChange={(e) => updateFormData("customRecipes", e.target.value)}
                                        className="min-h-[120px] text-base leading-relaxed"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between pt-8 border-t border-border">
                            <Button
                                variant="outline"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className="flex items-center gap-2 px-6 text-base bg-transparent"
                            >
                                <ChevronLeft className="w-4 h-4"/>
                                Previous
                            </Button>

                            {currentStep < steps.length ? (
                                <Button
                                    onClick={nextStep}
                                    className="flex items-center gap-2 px-6 text-base bg-primary hover:bg-primary/90"
                                >
                                    Next Step
                                    <ChevronRight className="w-4 h-4"/>
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    className="flex items-center gap-2 px-6 text-base bg-secondary hover:bg-secondary/90"
                                >
                                    <Check className="w-4 h-4"/>
                                    Create Meal Plan
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
