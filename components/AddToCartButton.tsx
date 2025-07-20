"use client";

import { Product } from "@/generated/prisma";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { addToCart } from "@/lib/actions";

export function AddToCartButton({ product }: { product: Product }) { 
    const [isAdding, setIsAdding] = useState(false);
    const handleAddToCart = async () => {
        try {
            setIsAdding(true);
            await addToCart(product.id);
        } catch (error) {
            console.error(error);
        } finally {
            setIsAdding(false);
         }
     }
    return (
        <Button
            onClick={handleAddToCart}
            className="w-full"
            disabled={product.inventory === 0 || isAdding}
        >
          <ShoppingCart className="mr-1 w-4 h-4" />
             { product.inventory > 0 ? "Add to cart" : "Out of stock"}
       </Button>
    )
}