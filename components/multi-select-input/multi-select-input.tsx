"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import {Option} from "@/types/option";
import TagList from "@/components/multi-select-input/tag-list";
import ClearButton from "@/components/multi-select-input/clear-button";
import OptionsList from "@/components/multi-select-input/option-list";


interface MultiSelectProps {
    options: Option[];
    selected: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    emptyMessage?: string;
    limit?: number;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
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

    // Filter options
    const filteredOptions = useMemo(
        () =>
            options
                .filter((opt) =>
                    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(0, limit),
        [options, searchQuery, limit]
    );

    const toggleOption = (value: string) => {
        if (selected.includes(value)) onChange(selected.filter((v) => v !== value));
        else onChange([...selected, value]);
    };

    const removeOption = (value: string) => onChange(selected.filter((v) => v !== value));

    const clearAll = () => {
        onChange([]);
        setSearchQuery("");
        inputRef.current?.focus();
    };

    // Adjust input width
    useEffect(() => {
        if (!containerRef.current || !inputRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        const tagsWidth = Array.from(containerRef.current.children)
            .filter((el) => el !== inputRef.current && el.tagName !== "SVG")
            .reduce((acc, el) => acc + el.clientWidth + 4, 0);
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
                    <TagList
                        selected={selected}
                        options={options}
                        inputRef={inputRef}
                        searchQuery={searchQuery}
                        inputWidth={inputWidth}
                        placeholder={placeholder}
                        onRemove={removeOption}
                        onInputChange={setSearchQuery}
                        onInputFocus={() => setOpen(true)}
                    />

                    {selected.length > 0 && <ClearButton onClick={clearAll} />}

                    <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                </div>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
                <input
                    type="text"
                    className="hidden"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <OptionsList
                    options={filteredOptions}
                    selected={selected}
                    onToggle={toggleOption}
                    emptyMessage={emptyMessage}
                />
            </PopoverContent>
        </Popover>
    );
};

export default MultiSelect;
