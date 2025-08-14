"use client";

import { Label } from "@/components/ui/label";
import React from "react";

interface FormFieldProps {
    id: string;
    label: string;
    error?: string;
    children: React.ReactNode;
}

export function FormField({ id, label, error, children }: FormFieldProps) {
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            {children}
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
