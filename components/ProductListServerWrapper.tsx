import { GetProductParams, getProducts } from "@/lib/actions";
import ProductList from "./ProducList";

interface ProductListServerWrapperProps {
    params: GetProductParams
 }


export async function ProductListServerWrapper({ params }: ProductListServerWrapperProps) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const products = await getProducts(params);
    return <ProductList products={products}/>
}