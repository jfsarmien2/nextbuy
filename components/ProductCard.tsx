
import { Product } from "@/generated/prisma";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";

function ProductCard({ product }: { product: Product }) {
  return (
   <Link href={`/product/${product.slug}`}>
    <Card className="pt-0 overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={product.image}
          alt={product.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          fill
        />
      </div>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{ product.description}</CardDescription>
      </CardHeader>
      <CardFooter>{ formatPrice(product.price)}</CardFooter>
    </Card>
   </Link>
  );
}

export default ProductCard;
