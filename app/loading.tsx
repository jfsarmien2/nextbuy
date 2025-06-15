import ProductSkeleton from "./ProductSkeleton"


function loading() {
  return (
    <main className="container max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <p>Showing 5 products</p>
      <ProductSkeleton />
    </main>
  )
}

export default loading
