"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { ChevronDown, X } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Option {
    label: string;
    value: string;
}

interface MultiSelectProps {
    options: Option[];
    selected: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    emptyMessage?: string;
    limit?: number;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
                                                            options,
                                                            selected,
                                                            onChange,
                                                            placeholder = "Select items",
                                                            emptyMessage = "No options found",
                                                            limit = 50,
                                                        }) => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputWidth, setInputWidth] = useState(120);

    const filteredOptions = useMemo(() => {
        return options
            .filter((opt) =>
                opt.label.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, limit);
    }, [options, searchQuery, limit]);

    const toggleOption = (value: string) => {
        if (selected.includes(value)) {
            onChange(selected.filter((v) => v !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    const removeOption = (value: string) => {
        onChange(selected.filter((v) => v !== value));
    };

    const clearAll = () => {
        onChange([]);
        setSearchQuery("");
        inputRef.current?.focus();
    };

    // Adjust input width dynamically
    useEffect(() => {
        if (!containerRef.current || !inputRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        const tagsWidth = Array.from(containerRef.current.children)
            .filter((el) => el !== inputRef.current && el.tagName !== "SVG")
            .reduce((acc, el) => acc + el.clientWidth + 4, 0); // gap
        setInputWidth(Math.max(60, containerWidth - tagsWidth - 16));
    }, [selected, searchQuery]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div
                    ref={containerRef}
                    className="w-full border rounded-md px-2 py-1 flex items-center gap-1 cursor-text min-h-[2.5rem] max-h-40 overflow-auto hover:ring-1 hover:ring-primary focus-within:ring-1 focus-within:ring-primary"
                    onClick={() => inputRef.current?.focus()}
                    role="combobox"
                    aria-expanded={open}
                >
                    {/* Tags + Input wrapper */}
                    <div className="flex flex-wrap items-center gap-1 flex-1 min-w-0">
                        {selected.map((val) => {
                            const opt = options.find((o) => o.value === val);
                            if (!opt) return null;
                            return (
                                <span
                                    key={opt.value}
                                    className="flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-sm"
                                >
                  {opt.label}
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeOption(opt.value);
                                        }}
                                    >
                    <X className="h-3 w-3 cursor-pointer opacity-60 hover:opacity-100" />
                  </span>
                </span>
                            );
                        })}

                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={selected.length === 0 ? placeholder : ""}
                            className="border-none outline-none px-1 py-0.5 text-sm flex-grow min-w-[60px]"
                            style={{ minWidth: inputWidth }}
                            onFocus={() => setOpen(true)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    {/* Clear All */}
                    {selected.length > 0 && (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="ml-1 px-2 py-0.5 text-xs flex-shrink-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                clearAll();
                            }}
                        >
                            Clear All
                        </Button>
                    )}

                    {/* Chevron stays right */}
                    <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                </div>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
                <Command>
                    {/* Synchronized popover input */}
                    <CommandInput
                        placeholder={placeholder}
                        value={searchQuery}
                        onValueChange={(val) => {
                            setSearchQuery(val);
                            if (!open) setOpen(true);
                        }}
                    />
                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                    <CommandGroup>
                        {filteredOptions.map((option) => {
                            const isSelected = selected.includes(option.value);
                            return (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => {}}
                                    className="!pointer-events-none"
                                >
                                    <div
                                        onClick={() => toggleOption(option.value)}
                                        className="flex w-full cursor-pointer items-center gap-2 !pointer-events-auto"
                                    >
                                        <Checkbox
                                            checked={isSelected}
                                            onCheckedChange={() => toggleOption(option.value)}
                                        />
                                        <span>{option.label}</span>
                                    </div>
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
