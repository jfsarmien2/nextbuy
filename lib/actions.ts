"use server";

import { Prisma } from "@/generated/prisma";
import { prisma } from "./prisma";

export interface GetProductParams { 
    query?: string;
    slug?: string;
    sort?: string;
    page?: number;
    pageSize?: number;
}

export async function getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
        where: {
            slug
        },
        include: {
            Category: true
        }
    });
    
    // if (!product) { 
    //     throw new Error('Product not found.');
    // }

    return product;
}


export async function getProducts({
    query,
    slug,
    sort,
    page = 1,
    pageSize = 3
}: GetProductParams) { 
    const where: Prisma.ProductWhereInput = {};
    
    if (query) {
        where.OR = [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
        ];
    }
    
    if (slug) { 
        where.Category = {
            slug
        }
    }

    const skip = pageSize ? (page - 1) * pageSize : undefined;
    const take = pageSize

    let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;

    if (sort === "price-asc") {
        orderBy = { price: "asc" };
    } else if (sort === "price-desc") {
        orderBy = { price: "desc" };
    }

    return await prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
    });
}