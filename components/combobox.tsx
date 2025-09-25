"use client"

import * as React from "react"
import {Check, ChevronsUpDown} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type Option = {
    value?: string
    label: string
}

interface ComboboxProps {
    options: Option[]
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    searchPlaceholder?: string
    emptyMessage?: string
}

export function Combobox({
                             options,
                             value = "",
                             onChange,
                             placeholder = "Select an option...",
                             searchPlaceholder = "Search...",
                             emptyMessage = "No results found.",
                         }: ComboboxProps) {
    const [open, setOpen] = React.useState(false)

    const selectedLabel = options.find((opt) => opt.value === value)?.label

    const handleSelect = (currentValue: string) => {
        const newValue = currentValue === value ? "" : currentValue
        setOpen(false)
        onChange?.(newValue)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-muted-foreground"
                >
                    {selectedLabel || placeholder}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} className="h-9" />
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {options.map((opt) => (
                                <CommandItem
                                    key={opt.value}
                                    value={opt.value}
                                    onSelect={handleSelect}
                                >
                                    {opt.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === opt.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
