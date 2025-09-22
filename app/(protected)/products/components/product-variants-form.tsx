"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import {FormField} from "@/components/form-field";

interface Variant {
    id: string
    option: string
    value: string
    price: string
}

export function ProductVariants() {
    const [variants, setVariants] = useState<Variant[]>([
        { id: "1", option: "", value: "", price: "" },
    ])

    const addVariant = () => {
        const newVariant: Variant = {
            id: Date.now().toString(),
            option: "",
            value: "",
            price: "",
        }
        setVariants([...variants, newVariant])
    }

    const updateVariant = (id: string, field: keyof Variant, value: string) => {
        setVariants(variants.map((variant) => (variant.id === id ? { ...variant, [field]: value } : variant)))
    }

    const removeVariant = (id: string) => {
        if (variants.length > 1) {
            setVariants(variants.filter((variant) => variant.id !== id))
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-3">
                    {variants.map((variant) => (
                        <div key={variant.id} className="grid grid-cols-3 gap-4">
                            <FormField id={"variant.name"} label={"Name"}>
                                <Select value={variant.option} onValueChange={(value) => updateVariant(variant.id, "option", value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="size">Size</SelectItem>
                                        <SelectItem value="color">Color</SelectItem>
                                        <SelectItem value="material">Material</SelectItem>
                                        <SelectItem value="style">Style</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormField>

                            <FormField id={"variant.value"} label={"value"} >
                                <Input
                                    placeholder=""
                                    value={variant.value}
                                    onChange={(e) => updateVariant(variant.id, "value", e.target.value)}
                                />
                            </FormField>

                            <FormField id={"variant.price"} label={"price"} >
                                <Input
                                    placeholder=""
                                    value={variant.price}
                                    onChange={(e) => updateVariant(variant.id, "price", e.target.value)}
                                />
                            </FormField>
                        </div>
                    ))}
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    onClick={addVariant}
                    className="flex items-center gap-2 text-sm font-medium text-foreground hover:bg-muted"
                >
                    <Plus className="h-4 w-4" />
                    Add Variant
                </Button>
            </div>
        </div>
    )
}
