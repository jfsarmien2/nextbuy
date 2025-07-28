import CartEntry from "@/components/CartEntry";
import CartSummary from "@/components/CartSummary";
import { Button } from "@/components/ui/button";
import { getCart } from "@/lib/actions";
import { processCheckout, ProcessCheckoutResponse } from "@/lib/order";
import { redirect } from "next/navigation";

export default async function CartPage() {
    const cart = await getCart();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const handleCheckout = async () => { 
        "use server";
        // Implement checkout logic here
        let result: ProcessCheckoutResponse | null = null;
        
        try {
            result = await processCheckout();
        } catch (error) {
            console.error("Error processing checkout:", error);
        }

        if(result) {
            redirect(result.sessionUrl);
        }
    }

    return (
        <main className="container mx-auto p-4">
            {!cart || cart.items.length === 0 ? (
                <div className="text-center">
                    <h2 className="text-2xl">Your cart is empty</h2>
                    <p className="text-gray-500">
                        Add some items to your cart to get started.
                    </p>
                </div>
            ) : (
                    <>
                        <div className="flex flex-col gap-4">
                            {cart.items.map((item) => (
                            <CartEntry key={item.id} cartItem={item} />
                            ))}
                        </div>
                        <CartSummary />
                        <form action={handleCheckout}>
                            <Button size="lg" className="w-full mt-4">
                               Proceed to Checkout
                            </Button>
                        </form>
                    </>
            )}
        </main>
    );
}