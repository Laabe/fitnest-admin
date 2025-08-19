"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface ClearButtonProps {
    onClick: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => (
    <Button
        size="sm"
        variant="ghost"
        className="ml-1 px-2 py-0.5 text-xs flex-shrink-0"
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
    >
        Clear All
    </Button>
);

export default ClearButton;
