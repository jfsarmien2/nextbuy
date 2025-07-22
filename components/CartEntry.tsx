"use client";

import { CartItemWithProducts, setProductQuantity } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";

interface CartEntryProps { 
    cartItem: CartItemWithProducts;
}

export default function CartEntry({ cartItem }: CartEntryProps) { 
     const [isLoading, setIsLoading] = useState(false);
    const handleSetProductQuantity = async (quantity: number) => {
        // Logic to increment the quantity of the cart item
        setIsLoading(true);
        try {
            // Call the API to update the quantity
            await setProductQuantity(cartItem.product.id, quantity);
        } catch (error) {
            console.error("Error updating cart item quantity:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <li className="border-b border-muted flex py-4 justify-between">
            <div className="flex space-x-4">
                <div className="absolute">
                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={isLoading}
                        className="w-7 h-7 rounded-full bg-muted text-muted-foreground z-10 -ml-1 -mt-2"
                        onClick={() => handleSetProductQuantity(0)}
                    >
                        <X className="w-4 h-4"/>
                    </Button>
                </div>
                <div className="overflow-hidden rounded-md border border-muted w-16 h-16">
                    <Image
                        className="h-full w-full object-cover"
                        src={cartItem.product.image}
                        alt={cartItem.product.name}
                        width={128}
                        height={128}
                    />
                </div>
                <div className="flex flex-col">
                    <div className="font-medium">{ cartItem.product.name}</div>
                </div>
            </div>
            <div className="flex flex-col justify-between items-end gap-2">
                <p className="font-medium text-center">{formatPrice(cartItem.product.price)}</p>
                <div className="flex items-center border border-muted rounded-full">
                    <Button variant="ghost" className="rounded-l-full" disabled={isLoading} onClick={() => handleSetProductQuantity(cartItem.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <p className="w-6 text-center">{cartItem.quantity}</p>
                    <Button variant="ghost" className="rounded-r-full" disabled={isLoading} onClick={() => handleSetProductQuantity(cartItem.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                 </div>
            </div>
        </li>
    )
}