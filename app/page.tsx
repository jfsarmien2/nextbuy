import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

async function HomePage() {
  const products = await prisma.product.findMany();
  return (
    <main className="container max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <p>Showing {products.length} products</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default HomePage;
