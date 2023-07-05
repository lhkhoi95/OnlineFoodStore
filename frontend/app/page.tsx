import getAllProducts from "@/lib/getAllProducts";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  const productsData: Promise<Product[]> = getAllProducts();
  const products: Product[] = await productsData;

  return (
    <main className="grid grid-cols-3-9">
      <div>This is a sidebar</div>
      <div className="pt-4">
        <p className="text-lg pl-3">All Products ({(await products).length})</p>
        <div className="flex flex-wrap pt-8">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
