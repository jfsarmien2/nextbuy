"use server";

import { cookies } from "next/headers";
import {  getCart } from "./actions";
import { prisma } from "./prisma";
import { createStripeCheckoutSession } from "./stripe";


export async function processCheckout() {
    const cart = await getCart();

    if (!cart || cart.items.length === 0) {
        throw new Error("Cart not found");
    }

    let orderId: string | null = null;
    
    try {
        const order = await prisma.$transaction(async (tx) => {
            const total = cart.subTotal;
            const newOrder = await tx.order.create({
                data: {
                    total,
                }
            });

            const newOrderItems = cart.items.map(item => ({
                orderId: newOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.product.price,
            }));

            await tx.orderItem.createMany({
                data: newOrderItems,
            });

            await tx.cartItem.deleteMany({
                where: { cartId: cart.id }
            });

            await tx.cart.delete({
                where: { id: cart.id }
            });

            return newOrder;

        });


        orderId = order.id;

        //1. Reload the full order details
        const fullOrder = await prisma.order.findUnique({
            where: { id: order.id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        //2. Confirm the order details loaded correctly
        if (!fullOrder) {
            throw new Error("Order not found");
        }

        //3. Create a Stripe checkout session
        const { sessionId, url } = await createStripeCheckoutSession(fullOrder);

        //4. Return the session url and handle any errors
        if (!sessionId || !url) { 
            throw new Error("Failed to create Stripe checkout session");
        }
        //5. Store the session ID in the order metadata and change the order status
        await prisma.order.update({
            where: { id: fullOrder.id },
            data: {
                stripeSessionId: sessionId,
                status: 'pending', // or whatever status you want to set
            },
        });
        // Clear the cart cookie
        (await cookies()).delete("cartId");

        return order;
    } catch (error) {
        //1. Optional: Change order status to failed
        if (orderId && error instanceof Error && error.message.includes("Stripe")) { 
            await prisma.order.update({
                where: { id: orderId },
                data: { status: 'failed' },
            });
        }
        console.error("Error creating order:", error);
        throw new Error("Failed to create order");
    }

}