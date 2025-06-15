import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Suspense } from "react";
import ProductSkeleton from "./ProductSkeleton";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const pageSize = 3;

async function Products({ page }: { page: number }) {
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    skip,
    take: pageSize,
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <>
      <p>Showing {products.length} products</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

async function HomePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;

  const total = await prisma.product.count();

  const totalPages = Math.ceil(total / pageSize);

  return (
    <main className="container max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <Suspense key={page} fallback={<ProductSkeleton />}>
        <Products page={page} />
      </Suspense>
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?page=${page - 1}`} />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                className={page === index + 1 ? "active" : ""}
                href={`?page=${index + 1}`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href={`?page=${page + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}

export default HomePage;
