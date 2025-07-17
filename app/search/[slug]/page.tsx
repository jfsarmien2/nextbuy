import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import ProductSkeleton from "../../ProductSkeleton";
import { notFound } from "next/navigation";
import Link from "next/link";

type CategoryPageProps = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ sort: string }>;
};

async function Products({ slug, sort }: { slug: string; sort?: string }) {
    let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;
    if (sort === "price-asc") {
        orderBy = { price: "asc" };
    } else if (sort === "price-desc") {
        orderBy = { price: "desc" };
    }

    const products = await prisma.product.findMany({
        where: {
            Category: {
                slug,
            },
        },
        ...(orderBy ? { orderBy } : {}),
        take: 10,
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (products.length === 0) {
        return (
            <div className="text-center text-muted-foreground">
                No products found
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { slug } = await params;
    const { sort } = await searchParams;

    const category = await prisma.category.findUnique({
        where: {
            slug,
        },
        select: {
            name: true,
            slug: true,
        },
    });

    if (!category) {
        notFound();
    }

    const breadcrumbs = [
        { label: "Products", href: "/" },
        { label: category.name, href: `/search/${category.slug}` },
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <div className="flex gap-3 text-sm mb-8">
                <Link href={`/search/${slug}`}>Latest</Link>
                <Link href={`/search/${slug}?sort=price-asc`}>Price: Low to High</Link>
                <Link href={`/search/${slug}?sort=price-desc`}>Price: High to Low</Link>
            </div>
            <Suspense key={`${slug}-${sort}`} fallback={<ProductSkeleton />}>
                <Products slug={slug} sort={sort} />
            </Suspense>
        </>
    );
}

export default CategoryPage;
