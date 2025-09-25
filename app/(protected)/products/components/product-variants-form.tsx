"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import { FormField } from "@/components/form-field"
import {useFieldArray, useFormContext, Controller, FieldErrors} from "react-hook-form"
import {ProductFormValues} from "@/app/(protected)/products/validations/product.schema";

export function ProductVariants() {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<ProductFormValues>()

    const typedErrors = errors as FieldErrors<ProductFormValues>

    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants",
    })

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {fields.map((field, index) => {
                    const optionError = typedErrors.variants?.[index]?.option?.message
                    const valueError  = typedErrors.variants?.[index]?.value?.message
                    const priceError  = typedErrors.variants?.[index]?.price?.message

                    return (
                        <div key={field.id} className="grid grid-cols-4 gap-4">
                            {/* Option select */}
                            <FormField
                                id={`variants.${index}.option`}
                                label="Option"
                                error={optionError}
                            >
                                <Controller
                                    name={`variants.${index}.option`}
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="size">Size</SelectItem>
                                                <SelectItem value="color">Color</SelectItem>
                                                <SelectItem value="material">Material</SelectItem>
                                                <SelectItem value="style">Style</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </FormField>

                            {/* Value input */}
                            <FormField
                                id={`variants.${index}.value`}
                                label="Value"
                                error={valueError}
                            >
                                <Input
                                    {...register(`variants.${index}.value`)}
                                    placeholder="Enter value"
                                />
                            </FormField>

                            {/* Price input */}
                            <FormField
                                id={`variants.${index}.price`}
                                label="Price"
                                error={priceError}
                            >
                                <Input
                                    type="number"
                                    step="0.01"
                                    {...register(`variants.${index}.price`, { valueAsNumber: true })}
                                    placeholder="0.00"
                                />
                            </FormField>

                            {/* Remove button */}
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => remove(index)}
                                className="text-red-500"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    )
                })}

                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => append({ option: "", value: "", price: 0 })}
                    className="flex items-center gap-2 text-sm font-medium text-foreground hover:bg-muted"
                >
                    <Plus className="h-4 w-4" />
                    Add Variant
                </Button>
            </div>
        </div>
    )
}
