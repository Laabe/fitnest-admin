"use client";
import React from "react";

interface TagInputProps {
    inputRef: React.RefObject<HTMLInputElement | null>;
    value: string;
    placeholder: string;
    width: number;
    onChange: (val: string) => void;
    onFocus: () => void;
}

const TagInput: React.FC<TagInputProps> = ({
                                               inputRef,
                                               value,
                                               placeholder,
                                               width,
                                               onChange,
                                               onFocus,
                                           }) => (
    <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-none outline-none px-1 py-0.5 text-sm flex-grow min-w-[60px]"
        style={{ minWidth: width }}
        onFocus={onFocus}
        onClick={(e) => e.stopPropagation()}
    />
);

export default TagInput;
