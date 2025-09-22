import { z } from "zod";

export const ProfileSettingsFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    role: z.string(),
});

export type ProfileSettingsFormValues = z.infer<typeof ProfileSettingsFormSchema>;
