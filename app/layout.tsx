'use client';

import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React from "react";
import {useAuthRedirect} from "@/hooks/useAuthRedirect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout(
    {children}: Readonly<{ children: React.ReactNode; }>
) {
    useAuthRedirect();
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
