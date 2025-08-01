import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const payload = await request.text();
    const signature = request.headers.get("stripe-signature") || "";

    if (!signature) {
        return new NextResponse("Missing signature header", { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    try {

        const event = stripe.webhooks.constructEvent(
            payload,
            signature,
            webhookSecret
        );

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const orderId = session.metadata?.orderId;
            if (!orderId) {
                console.error("No order ID found in session metadata");
                return new NextResponse("Order ID not found", { status: 400 });
            }
    
            // Handle the checkout session completion logic here
            await prisma.order.update({
                where: { id: orderId },
                data: {
                    status: "paid",
                    stripePaymentIntentId: session.payment_intent?.toString(),
                },
            })
        } else { 
            console.warn("Unhandled event type:", event.type);
        }
        return new NextResponse(null, { status: 200 });
    } catch (error) {
        console.error("Error verifying webhook signature:", error);
        return new NextResponse("Webhook verification failed", { status: 400 });
    }
}