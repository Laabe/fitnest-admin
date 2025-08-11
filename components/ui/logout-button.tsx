'use client';

import * as React from 'react';
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {LogOut} from "lucide-react";
import {logout} from "@/services/auth.service";

export function LogoutButton() {
    const [loading, setLoading] = React.useState(false);

    async function handleLogout() {
        setLoading(true);
        const ok = await logout();
        if (ok) {
            window.location.href = '/login';
        } else {
            alert('Logout failed. Please try again.');
            setLoading(false);
        }
    }

    return (
        <DropdownMenuItem onClick={handleLogout} disabled={loading}>
            <LogOut />
            {loading ? 'Logging out…' : 'Logout'}
        </DropdownMenuItem>
    );
}