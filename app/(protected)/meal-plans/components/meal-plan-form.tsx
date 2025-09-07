"use client"

import type React from "react"

import {useState, useCallback} from "react"
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
    ChefHat,
    Settings,
    BookOpen,
    Check,
    ChevronRight,
    ChevronLeft,
    ImageIcon,
    Upload,
    X,
    Search,
    ChevronsUpDown,
} from "lucide-react"
import {cn} from "@/lib/utils"

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
    const [dropdownOpen, setDropdownOpen] = useState({
        breakfast: false,
        lunch: false,
        dinner: false,
    })
    const [selectedFilters, setSelectedFilters] = useState({
        breakfast: [] as string[],
        lunch: [] as string[],
        dinner: [] as string[],
    })
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
        selectedRecipes: {
            breakfast: [] as string[],
            lunch: [] as string[],
            dinner: [] as string[],
        },
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

    const recipesByMeal = {
        breakfast: [
            {name: "Avocado Toast", emoji: "🥑"},
            {name: "Greek Yogurt Parfait", emoji: "🥣"},
            {name: "Scrambled Eggs", emoji: "🍳"},
            {name: "Overnight Oats", emoji: "🥣"},
            {name: "Smoothie Bowl", emoji: "🍓"},
            {name: "Pancakes", emoji: "🥞"},
            {name: "French Toast", emoji: "🍞"},
            {name: "Chia Pudding", emoji: "🥄"},
            {name: "Breakfast Burrito", emoji: "🌯"},
            {name: "Granola Bowl", emoji: "🥣"},
            {name: "Egg Benedict", emoji: "🍳"},
            {name: "Acai Bowl", emoji: "🍓"},
            {name: "Bagel & Cream Cheese", emoji: "🥯"},
            {name: "Protein Shake", emoji: "🥤"},
            {name: "Waffles", emoji: "🧇"},
        ],
        lunch: [
            {name: "Grilled Chicken Salad", emoji: "🥗"},
            {name: "Quinoa Buddha Bowl", emoji: "🥙"},
            {name: "Turkey Sandwich", emoji: "🥪"},
            {name: "Vegetable Stir Fry", emoji: "🥬"},
            {name: "Soup & Salad Combo", emoji: "🍲"},
            {name: "Pasta Salad", emoji: "🍝"},
            {name: "Caesar Salad", emoji: "🥗"},
            {name: "Sushi Bowl", emoji: "🍣"},
            {name: "Mediterranean Wrap", emoji: "🌯"},
            {name: "Chicken Noodle Soup", emoji: "🍜"},
            {name: "Fish Tacos", emoji: "🌮"},
            {name: "Caprese Sandwich", emoji: "🥪"},
            {name: "Poke Bowl", emoji: "🐟"},
            {name: "Ramen Bowl", emoji: "🍜"},
            {name: "Club Sandwich", emoji: "🥪"},
        ],
        dinner: [
            {name: "Salmon with Quinoa", emoji: "🐟"},
            {name: "Grilled Steak", emoji: "🥩"},
            {name: "Pasta Primavera", emoji: "🍝"},
            {name: "Turkey Meatballs", emoji: "🦃"},
            {name: "Roasted Vegetables", emoji: "🥕"},
            {name: "Chicken Curry", emoji: "🍛"},
            {name: "Beef Stir Fry", emoji: "🥢"},
            {name: "Margherita Pizza", emoji: "🍕"},
            {name: "Lamb Chops", emoji: "🍖"},
            {name: "Vegetable Lasagna", emoji: "🍝"},
            {name: "Chicken Alfredo", emoji: "🍝"},
            {name: "Shrimp Scampi", emoji: "🦐"},
            {name: "BBQ Ribs", emoji: "🍖"},
            {name: "Pad Thai", emoji: "🍜"},
            {name: "Stuffed Bell Peppers", emoji: "🫑"},
        ],
    }

    const toggleRecipe = (mealType: string, recipeName: string) => {
        setFormData((prev) => {
            const currentRecipes = prev.selectedRecipes[mealType as keyof typeof prev.selectedRecipes]
            const isSelected = currentRecipes.includes(recipeName)

            return {
                ...prev,
                selectedRecipes: {
                    ...prev.selectedRecipes,
                    [mealType]: isSelected ? currentRecipes.filter((r) => r !== recipeName) : [...currentRecipes, recipeName],
                },
            }
        })
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
                                                    isCompleted && "border-secondary bg-secondary text-secondary-foreground shadow-secondary/25",
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
                                                <Label
                                                    className="text-sm font-medium text-muted-foreground">Preview</Label>
                                                <div className="relative group">
                                                    <div
                                                        className="border-2 border-dashed border-border rounded-xl overflow-hidden bg-muted/30">
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
                                                            <X className="w-4 h-4"/>
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
                                                        {dragActive ? <Upload className="w-8 h-8"/> :
                                                            <ImageIcon className="w-8 h-8"/>}
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
                                                        <p className="text-sm text-muted-foreground">Drag and drop an
                                                            image, or click to browse</p>
                                                        <p className="text-xs text-muted-foreground mt-2">Supports JPG,
                                                            PNG, GIF up to 10MB</p>
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
                                                        <Label htmlFor={period.key} className="text-base font-medium">
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
                                            <div key={meal.key} className="p-6 rounded-xl border border-border bg-card">
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
                                {Object.entries(formData.meals)
                                    .filter(([_, isSelected]) => isSelected)
                                    .map(([mealType, _]) => {
                                        const allRecipes = recipesByMeal[mealType as keyof typeof recipesByMeal]
                                        const selectedRecipes = formData.selectedRecipes[mealType as keyof typeof formData.selectedRecipes]

                                        return (
                                            <div key={mealType} className="space-y-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-8 bg-primary rounded-full"/>
                                                    <Label
                                                        className="text-lg font-semibold capitalize">{mealType} Recipes</Label>
                                                    <Badge variant="secondary" className="ml-auto">
                                                        {selectedRecipes.length} selected
                                                    </Badge>
                                                </div>

                                                <div className="space-y-4">
                                                    <Popover
                                                        open={dropdownOpen[mealType as keyof typeof dropdownOpen]}
                                                        onOpenChange={(open) => setDropdownOpen((prev) => ({
                                                            ...prev,
                                                            [mealType]: open
                                                        }))}
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={dropdownOpen[mealType as keyof typeof dropdownOpen]}
                                                                className="w-full justify-between h-11 text-left font-normal bg-transparent"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <Search className="w-4 h-4 text-muted-foreground"/>
                                                                    <span className="text-muted-foreground">Search and select {mealType} recipes...</span>
                                                                </div>
                                                                <ChevronsUpDown
                                                                    className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-full p-0" align="start">
                                                            <Command>
                                                                <CommandInput
                                                                    placeholder={`Search ${mealType} recipes...`}
                                                                    className="h-11"/>
                                                                <CommandList className="max-h-[300px]">
                                                                    <CommandEmpty>No recipes found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {allRecipes.map((recipe) => (
                                                                            <CommandItem
                                                                                key={recipe.name}
                                                                                value={recipe.name}
                                                                                onSelect={() => {
                                                                                    toggleRecipe(mealType, recipe.name)
                                                                                }}
                                                                                className="flex items-center gap-2 cursor-pointer"
                                                                            >
                                                                                <div
                                                                                    className={cn(
                                                                                        "w-4 h-4 border border-primary rounded flex items-center justify-center",
                                                                                        selectedRecipes.includes(recipe.name) && "bg-primary",
                                                                                    )}
                                                                                >
                                                                                    {selectedRecipes.includes(recipe.name) && (
                                                                                        <Check
                                                                                            className="w-3 h-3 text-primary-foreground"/>
                                                                                    )}
                                                                                </div>
                                                                                <span
                                                                                    className="flex items-center gap-2">
                                          <span>{recipe.emoji}</span>
                                                                                    {recipe.name}
                                        </span>
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>

                                                {selectedRecipes.length > 0 && (
                                                    <div
                                                        className="space-y-3 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                                                        <Label
                                                            className="text-sm font-semibold text-secondary capitalize">
                                                            Selected {mealType} Recipes ({selectedRecipes.length})
                                                        </Label>
                                                        <div
                                                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                            {selectedRecipes.map((recipeName) => {
                                                                const recipe = allRecipes.find((r) => r.name === recipeName)
                                                                return (
                                                                    <div
                                                                        key={recipeName}
                                                                        className="flex items-center justify-between p-3 rounded-lg bg-background border border-border"
                                                                    >
                                                                        <div className="flex items-center gap-2">
                                                                            <span>{recipe?.emoji}</span>
                                                                            <span
                                                                                className="font-medium">{recipeName}</span>
                                                                        </div>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={() => toggleRecipe(mealType, recipeName)}
                                                                            className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                                                        >
                                                                            <X className="w-3 h-3"/>
                                                                        </Button>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}

                                {!Object.values(formData.meals).some(Boolean) && (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50"/>
                                        <p className="text-lg font-medium mb-2">No meals selected</p>
                                        <p>Please go back to step 2 and select at least one meal to see recipe
                                            options.</p>
                                    </div>
                                )}
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
