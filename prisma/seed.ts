import { PrismaClient, Product } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const electronics = await prisma.category.create({
        data: {
            name: "Electronics",
            slug: "electronics",
        },
    });

    const clothing = await prisma.category.create({
        data: {
            name: "Clothing",
            slug: "clothing",
        },
    });

    const home = await prisma.category.create({
        data: {
            name: "Home",
            slug: "home",
        },
    });

    const products = [
        {
            id: "1",
            name: "Wireless Bluetooth Headphones",
            price: 59.99,
            description:
                "High-quality wireless headphones with noise cancellation and long battery life.",
            image:
                "https://images.unsplash.com/photo-1599605571400-84c8410dc889?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            categoryId: electronics.id,
            slug: "wireless-bluetooth-headphone",
            inventory: 5
        },
        {
            id: "2",
            name: "Smart Fitness Watch",
            price: 129.99,
            description:
                "Track your fitness goals with this waterproof smart watch with heart-rate monitoring.",
            image:
                "https://images.unsplash.com/photo-1629339837617-7069ce9e7f6b?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            categoryId: electronics.id,
            slug: "smart-fiteness-watch",
            inventory: 50,
        },
        {
            id: "3",
            name: "Gaming Laptop",
            price: 1199.99,
            description:
                "High-performance gaming laptop with NVIDIA graphics and 16GB RAM.",
            image:
                "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            categoryId: electronics.id,
            slug: "gaming-laptop",
            inventory: 20,
        },
        {
            id: "4",
            name: "Coffee Maker",
            price: 89.99,
            description: "Brew the perfect cup with this programmable coffee maker.",
            image:
                "https://images.unsplash.com/photo-1707241358597-bafcc8a8e73d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            categoryId: home.id,
            slug: "coffee-maker",
            inventory: 30
        },
        {
            id: "5",
            name: "Office Chair",
            price: 199.99,
            description:
                "Ergonomic office chair with lumbar support and adjustable height.",
            image:
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            categoryId: home.id,
            slug: "office-chair",
            inventory: 2
        },
        {
            id: "6",
            name: "Wireless Headphones",
            description:
                "Premium noise-cancelling wireless headphones with long battery life.",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            categoryId: electronics.id,
            slug: "wireless-headphone",
            inventory: 10
        },
        {
            id: "7",
            name: "Smart Watch",
            description:
                "Fitness tracker with heart rate monitoring and sleep analysis.",
            price: 149.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
            categoryId: electronics.id,
            slug: "smart-watch",
            inventory: 25
        },
    ];

    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
    }
}

main()
    .then(async () => {
        console.log("Seeding complete...");
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
