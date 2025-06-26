import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
} : {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
        },
      ],
    },
  };
}

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const breadcrumbsItems = [
    { label: 'Products', href: '/' },
    { label: 'Category', href: `/category/${product?.Category?.slug}` },
    { label: product.name, href: `/product/${product?.slug}`, active: true },
  ];

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <main className="container mx-auto p-4">
      <Breadcrumbs items={breadcrumbsItems}/>
      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-lg overflow-hidden h-[200px] md:h-[400px]">
              {product.image && 
                <Image  className="object-cover" src={product.image} alt={product.name} fill priority sizes="(max-width:768px) 100vw, 50vw"/>
              }
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-semibold text-lg">
                {formatPrice(product.price)}
              </span>
              <Badge variant="outline">{product.Category?.name}</Badge>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h2 className="font-medium">Description</h2>
              <p>{product.description}</p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h2 className="font-medium">Availability</h2>
              <div className="flex items-center gap-4">
                {product.inventory > 0 ?
                  <Badge variant="outline" className="text-green-600">In stock ({ product.inventory})</Badge>
                  :
                  <Badge variant="outline" className="text-red-600">Out of stock</Badge>
                }
                {product.inventory > 0 &&
                  <span className="text-gray-500 text-xs">({ product.inventory} items available)</span>
                }
              </div>
            </div>
            <Separator className="my-4" />
            <div>
              <Button>
                <ShoppingCart className="mr-1 w-4 h-4" />
                { product.inventory > 0 ? "Add to cart" : "Out of stock"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default ProductPage;
