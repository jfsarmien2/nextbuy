// import ProductCard from "@/components/ProductCard";
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
import Breadcrumbs from "@/components/Breadcrumbs";
import { ProductListServerWrapper } from "@/components/ProductListServerWrapper";
import { getProductsCountCached } from "@/lib/actions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const pageSize = 3;

// async function Products({ page }: { page: number }) {
//   const skip = (page - 1) * pageSize;

//   const products = await prisma.product.findMany({
//     skip,
//     take: pageSize,
//   });

//   await new Promise((resolve) => setTimeout(resolve, 3000));
//   return (
//     <>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </>
//   );
// }

async function HomePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;

  const total = await getProductsCountCached();

  const totalPages = Math.ceil(total / pageSize);

  return (
    <main className="container mx-auto p-4">
      <Breadcrumbs items={[{label: 'Products', href: '/', active: true}]}/>
      <Suspense key={page} fallback={<ProductSkeleton />}>
        {/* <Products page={page} /> */}
        <ProductListServerWrapper params={{page, pageSize}}/>
      </Suspense>
      <Pagination className="mt-8">
        <PaginationContent>

          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`?page=${page - 1}`} />
            </PaginationItem>
          )}

          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={page === index + 1}
                href={`?page=${index + 1}`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          {page < totalPages && (
            <PaginationItem>
              <PaginationNext href={`?page=${page + 1}`} />
            </PaginationItem>
          )}

        </PaginationContent>
      </Pagination>
    </main>
  );
}

export default HomePage;
