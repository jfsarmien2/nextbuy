import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import ProductSkeleton from "../ProductSkeleton";

type SearchPageProps = {
    searchParams: Promise<{ query?: string; sort?: string }>;
};

async function Products({ query }: { query: string }) {

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: 10
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (products.length === 0) {
    return <div className="text-center text-muted-foreground ">No products found</div>
  }

  return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
  );
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.query?.trim() || "";
   
  const breadcrumbs = [
    { label: 'Products', href: '/' },
    { label: `Results for "${query}"`, href: `/search?query=${encodeURIComponent(query)}` },
  ]

  return (
  <main className="container mx-auto p-4">
      <Breadcrumbs items={breadcrumbs} />
      <Suspense
        key={query}
        fallback={ <ProductSkeleton />}
        >
        <Products query={query} />
      </Suspense>
    </main>
  )
}

export default SearchPage