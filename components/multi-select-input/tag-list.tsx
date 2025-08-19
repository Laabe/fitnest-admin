"use client";
import React from "react";
import TagInput from "@/components/multi-select-input/tag-input";
import {Option} from "@/types/option";
import Tag from "@/components/multi-select-input/tag";

interface TagListProps {
    selected: string[];
    options: Option[];
    inputRef: React.RefObject<HTMLInputElement | null>;
    searchQuery: string;
    inputWidth: number;
    placeholder: string;
    onRemove: (value: string) => void;
    onInputChange: (val: string) => void;
    onInputFocus: () => void;
}

const TagList: React.FC<TagListProps> = ({
                                             selected,
                                             options,
                                             inputRef,
                                             searchQuery,
                                             inputWidth,
                                             placeholder,
                                             onRemove,
                                             onInputChange,
                                             onInputFocus,
                                         }) => (
    <div className="flex flex-wrap items-center gap-1 flex-1 min-w-0">
        {selected.map((val) => {
            const opt = options.find((o) => o.value === val);
            if (!opt) return null;
            return <Tag key={opt.value} label={opt.label} onRemove={() => onRemove(opt.value)} />;
        })}
        <TagInput
            inputRef={inputRef}
            value={searchQuery}
            placeholder={selected.length === 0 ? placeholder : ""}
            width={inputWidth}
            onChange={onInputChange}
            onFocus={onInputFocus}
        />
    </div>
);

export default TagList;
