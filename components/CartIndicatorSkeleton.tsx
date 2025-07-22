import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { getCart } from "@/lib/actions";

export async function CartIndicatorSkeleton() {
    return (
        <Button
            variant="ghost"
            size="icon"
            asChild
            className="relative animate-pulse"
            disabled
        >
            <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
            </Link>
        </Button>
    )
 }