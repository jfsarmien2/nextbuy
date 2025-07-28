import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Prisma } from "@/generated/prisma";

interface OrderItemProps { 
    orderItem: Prisma.OrderItemGetPayload<{
        include: {
            product: true;
        };
    }>;
}

export default function OrderItem({ orderItem }: OrderItemProps) { 
    

    return (
        <li className="border-b border-muted flex py-4 justify-between">
            <div className="flex space-x-4">
                <div className="overflow-hidden rounded-md border border-muted w-16 h-16">
                    <Image
                        className="h-full w-full object-cover"
                        src={orderItem.product.image}
                        alt={orderItem.product.name}
                        width={128}
                        height={128}
                    />
                </div>
                <div className="flex flex-col">
                    <div className="font-medium">{ orderItem.product.name}</div>
                </div>
            </div>
            <div className="flex flex-col justify-between items-end gap-2">
                <p className="font-medium text-center">{formatPrice(orderItem.product.price)}</p>
                <p className="text-center p-1">Quantity: {orderItem.quantity}</p>
            </div>
        </li>
    )
}