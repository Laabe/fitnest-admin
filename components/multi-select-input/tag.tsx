"use client";
import React from "react";
import { X } from "lucide-react";

interface TagProps {
    label: string;
    onRemove: () => void;
}

const Tag: React.FC<TagProps> = ({ label, onRemove }) => (
    <span className="flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-sm">
    {label}
        <span onClick={(e) => {
            e.stopPropagation(); // ✅ stop parent click
            onRemove();
        }}>
      <X className="h-3 w-3 cursor-pointer opacity-60 hover:opacity-100" />
    </span>
  </span>
);

export default Tag;
