"use client";
import React from "react";
import { Command, CommandEmpty, CommandGroup } from "@/components/ui/command";
import {Option} from "@/types/option";
import OptionItem from "@/components/multi-select-input/option-item";


interface OptionsListProps {
    options: Option[];
    selected: string[];
    onToggle: (value: string) => void;
    emptyMessage: string;
}

const OptionsList: React.FC<OptionsListProps> = ({ options, selected, onToggle, emptyMessage }) => (
    <Command>
        <CommandEmpty>{emptyMessage}</CommandEmpty>
        <CommandGroup>
            {options.map((option) => (
                <OptionItem key={option.value} option={option} selected={selected.includes(option.value)} onToggle={onToggle} />
            ))}
        </CommandGroup>
    </Command>
);

export default OptionsList;
