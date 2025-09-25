import React from "react";

export function formatLaravelErrors(messages: string[]) {
    return (
        <ul className="list-disc pl-4">
            {messages.map((msg, i) => (
                <li key={i}>{msg}</li>
            ))}
        </ul>
    );
}