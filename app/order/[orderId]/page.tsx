import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import OrderItem from "./OrderItem";
import OrderSummary from "./OrderSummary";

interface OrderPageProps {
    params: Promise<{ orderId: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
    const { orderId } = await params;

    // Fetch the order details from the database
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!order) {
        return notFound();
    }

    // Render the order details
    return (
        <main className="container mx-auto p-4">
            <OrderSummary order={order} />
            <ul>
                {order.items.map(item => (
                    <OrderItem key={item.id} orderItem={item} />
                ))}
            </ul>
        </main>
    );
}