import {z} from "zod";

export const ProductSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    sku: z.string().min(2, "SKU must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.object({
        base: z.number().min(1, "Price must be bigger then 0"),
        discount: z
            .number()
            .min(0, "Discount price must be a valid number")
            .optional(),
    }),
    stock_quantity: z.number().min(0, "Stock must be a valid number"),
    status: z.enum(["active", "draft", "archived"]),
    category_id: z.uuid(),
    images: z.array(z.instanceof(File)).optional(),
    variants: z
        .array(z.object({
            option: z.string(),
            value: z.string(),
            price: z.number().min(0, "Price must be a valid number"),
        }))
        .optional()
});

export type ProductFormValues = z.infer<typeof ProductSchema>;
