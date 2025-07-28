import { Badge } from "@/components/ui/badge";
import { getCart, OrderWithItemsAndProducts } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";


interface OrderSummaryProps { 
    order: OrderWithItemsAndProducts
}

function StatusBadge({ status }: { status: string }) {
    const statusMapping: Record<string, string> = {
        pending: "Pending",
        pending_payment: "Pending Payment",
        failed: "Failed",
        paid: "Paid",
    };
    return (
        <Badge variant="outline">{statusMapping[status] || status}</Badge>
    );
}


export default async function OrderSummary({ order }: OrderSummaryProps) {

    return (
        <div className="flex flex-col pt-4">
            <div className="text-sm text-muted-foreground">
                <div className="flex items-center justify-between border-b pb-1 mb-3">
                    <p>Subtotal</p>
                    <p className="text-base text-foreground">{formatPrice(order.total)}</p>
                </div>
            </div>

            <div className="text-sm text-muted-foreground">
                <div className="flex items-center justify-between border-b pb-1 mb-3">
                    <p>Taxes</p>
                    <p>{formatPrice(0)}</p>
                </div>
            </div>

            <div className="text-sm text-muted-foreground">
                <div className="flex items-center justify-between border-b pb-1 mb-3">
                    <p>Shipping</p>
                    <p>{formatPrice(0)}</p>
                </div>
            </div>

            <div className="text-sm text-muted-foreground">
                <div className="flex items-center justify-between border-b pb-1 mb-3">
                    <p>Status</p>
                    <StatusBadge status={order.status} />
                </div>
            </div>

            <div className="text-sm text-muted-foreground">
                <div className="flex items-center justify-between border-b pb-1 mb-3">
                    <p>Total</p>
                    <p className="text-base text-foreground">{formatPrice(order.total)}</p>
                </div>
            </div>
        </div>
    );
}