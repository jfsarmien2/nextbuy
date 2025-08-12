import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import Breadcrumbs from "@/components/Breadcrumbs";
import OrderItem from "./OrderItem";
import OrderSummary from "./OrderSummary";

interface OrderPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  const session = await auth();
  const isOwner = session?.user?.id === order.userId;

  return (
    <main className="container mx-auto p-4">
      {isOwner && (
        <Breadcrumbs
          items={[
            {
              label: "My Account",
              href: "/account",
            },
            {
              label: "Order",
              href: `/order/${order.id}`,
            },
          ]}
        />
      )}
      <ul>
        {order.items.map((item) => (
          <OrderItem key={item.id} orderItem={item} />
        ))}
      </ul>
      <OrderSummary order={order} />
    </main>
  );
}