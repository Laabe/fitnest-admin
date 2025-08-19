"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CommandItem } from "@/components/ui/command";
import {Option} from "@/types/option";

interface OptionItemProps {
    option: Option;
    selected: boolean;
    onToggle: (value: string) => void;
}

const OptionItem: React.FC<OptionItemProps> = ({ option, selected, onToggle }) => (
    <CommandItem key={option.value} onSelect={() => {}} className="!pointer-events-none">
        <div
            onClick={() => onToggle(option.value)}
            className="flex w-full cursor-pointer items-center gap-2 !pointer-events-auto"
        >
            <Checkbox checked={selected} onCheckedChange={() => onToggle(option.value)} />
            <span>{option.label}</span>
        </div>
    </CommandItem>
);

export default OptionItem;
