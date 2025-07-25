import Stripe from 'stripe';
import { OrderWithItemsAndProducts } from './actions';

if (!process.env.STRIPE_SECRET_KEY) { 
    throw new Error('Missing STRIPE_SECRET_KEY in environment variables');
}


export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-06-30.basil",
    typescript: true,
});

export async function createStripeCheckoutSession(order: OrderWithItemsAndProducts) {
  if(!order || !order.items || order.items.length === 0) {
    throw new Error("Order items are required to create a checkout session");
    } 
    
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = order.items.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.product.name,
                description: item.product.description ?? "",
                images: [item.product.image],
            },
            unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart?cancel=true`,
            metadata: {
                orderId: order.id,
            },
        });
        return { sessionId: session.id, url: session.url };
    } catch (error) {
        //1. Optional: Change order status to failed
        console.error("Error creating Stripe checkout session:", error);
        throw new Error("Failed to create checkout session");
    }
}