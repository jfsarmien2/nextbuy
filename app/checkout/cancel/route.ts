import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { notFound, redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const sessionId = req.nextUrl.searchParams.get("session_id");
    if (!sessionId) {
        notFound();
    }

    // Here you would typically fetch the session details from Stripe
    // and render a success page with the order details.
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const orderId = session.metadata?.orderId;
        if (!orderId) {
            notFound();
        }
        
        const order = await prisma.order.findFirst({
            where: { id: orderId, stripeSessionId: sessionId },
        });

       if (!order) {
           notFound();
        }
        
        if (order.status === "pending") { 
            await prisma.order.update({
                where: { id: order.id },
                data: { status: "pending", stripeSessionId: null },
            });
        }

        return redirect(`/`);

    } catch (error) {
        console.error("Error fetching checkout session:", error);
        notFound();
    }
    return redirect("");
}