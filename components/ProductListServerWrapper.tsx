import { GetProductParams, getProducts } from "@/lib/actions";
import ProductList from "./ProducList";

interface ProductListServerWrapperProps {
    params: GetProductParams
 }


export async function ProductListServerWrapper({ params }: ProductListServerWrapperProps) {
    const products = await getProducts(params);
    return <ProductList products={products}/>
}