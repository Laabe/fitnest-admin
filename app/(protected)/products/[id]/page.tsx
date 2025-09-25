"use client"

import {Button} from "@/components/ui/button";
import {CircleDollarSign, HandCoins, Layers2, PencilLine, Trash2, Truck} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {useProducts} from "@/hooks/useProducts";
import {useEffect} from "react";
import {useParams, useRouter} from "next/navigation";
import {toast} from "sonner";
import {formatLaravelErrors} from "@/utils/formatLaravelErrors";

export default function Page() {
    const {id} = useParams();
    const router = useRouter();
    const {getProduct, deleteProduct, loading, product} = useProducts();

    useEffect(() => {
        id && getProduct(id as string).catch((error: any) => {
            const messages: string[] = error.message?.split("\n") ?? ["Failed to fetch product!"];
            toast.error("Failed to fetch product", {
                    description: formatLaravelErrors(messages),
                }
            );
        });
    }, [id]);

    const onDelete = (id: string) => {
        deleteProduct(id)
            .then(() => {
                    router.push(`/products`)
                    toast.success("Product deleted successfully.");
                }
            ).catch((error: any) => {
            const messages: string[] = error.message?.split("\n") ?? ["Failed to delete product!"];
                toast.error("Failed to delete product", {
                    description: formatLaravelErrors(messages),
                }
            );
        });
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            <div className="flex flex-row items-start justify-between">
                <div className={"space-y-2"}>
                    <h1 className={"font-bold text-xl tracking-tight lg:text-2xl"}>
                        {product?.name}
                    </h1>
                    <div className={"text-muted-foreground inline-flex flex-col gap-2 text-sm lg:flex-row lg:gap-4"}>
                        <div>
                            <span className={"text-foreground font-semibold"}>Published : </span>
                            {product?.created_at
                                ? new Date(product.created_at).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })
                                : ""}
                        </div>
                        <div>
                            <span className={"text-foreground font-semibold"}>SKU : </span>
                            {product?.sku}
                        </div>
                    </div>
                </div>
                <div className={"flex items-center space-x-2"}>
                    <Button
                        disabled={loading}
                        onClick={() => router.push(`/products/${product.id}/edit`)}
                    >
                        <PencilLine/>
                        Edit
                    </Button>
                    <Button
                        variant={"destructive"}
                        disabled={loading}
                        onClick={() => onDelete(product.id)}
                    >
                        <Trash2/>
                    </Button>
                </div>
            </div>
            <div className={"grid gap-4 xl:grid-cols-3"}>
                <div className={"min-w-0 xl:col-span-1"}>
                    <div className={"sticky top-20 space-y-4"}>
                        <Carousel>
                            <CarouselContent>
                                {Array.from({length: 5}).map((_, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1">
                                            <Card>
                                                <CardContent
                                                    className="flex aspect-square items-center justify-center p-6">
                                                    <span className="text-4xl font-semibold">{index + 1}</span>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className={"ml-20"}/>
                            <CarouselNext className={"mr-20"}/>
                        </Carousel>
                    </div>
                </div>
                <div className={"space-y-4 xl:col-span-2"}>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <div
                            className="hover:border-primary/30 bg-muted grid auto-cols-max grid-flow-col gap-4 rounded-xl border p-4">
                            <CircleDollarSign className={"text-gray-400"}/>
                            <div className="flex flex-col gap-1">
                                <span className="text-muted-foreground text-sm">Price</span>
                                <span className="text-lg font-semibold">{product?.price?.base} MAD</span>
                            </div>
                        </div>
                        <div
                            className="hover:border-primary/30 bg-muted grid auto-cols-max grid-flow-col gap-4 rounded-xl border p-4">
                            <Truck className={"text-gray-400"}/>
                            <div className="flex flex-col gap-1">
                                <span className="text-muted-foreground text-sm">No. of Orders</span>
                                <span className="text-lg font-semibold">250</span>
                            </div>
                        </div>
                        <div
                            className="hover:border-primary/30 bg-muted grid auto-cols-max grid-flow-col gap-4 rounded-xl border p-4">
                            <Layers2 className={"text-gray-400"}/>
                            <div className="flex flex-col gap-1">
                                <span className="text-muted-foreground text-sm">Available Stocks</span>
                                <span className="text-lg font-semibold">{product?.stock_quantity}</span>
                            </div>
                        </div>
                        <div
                            className="hover:border-primary/30 bg-muted grid auto-cols-max grid-flow-col gap-4 rounded-xl border p-4">
                            <HandCoins className={"text-gray-400"}/>
                            <div className="flex flex-col gap-1">
                                <span className="text-muted-foreground text-sm">Total Revenue</span>
                                <span className="text-lg font-semibold">45,938 MAD</span>
                            </div>
                        </div>
                    </div>
                    <Card className={"bg-card text-card-foreground flex flex-col gap-6 border py-6"}>
                        <CardContent className={"px-6 space-y-4"}>
                            <div className="grid items-start gap-8">
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="mb-2 font-semibold">Description:</h3>
                                        <p className="text-muted-foreground">
                                            {product?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}