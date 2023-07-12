"use client"
import React from "react";
import ProductCard from "./ProductCard";
import ProductPageSkeleton from "@/app/loading";
import getAllProducts from "@/lib/getAllProducts";

export const ProductsPage = () => {
  const { data, error, isLoading } = getAllProducts();
  if (isLoading) return <ProductPageSkeleton />;
  if (error) throw new Error("Failed to load products");

  const products: Product[] = data;

  return (
    <main className="grid grid-cols-3-9">
      <div>This is a sidebar</div>
      <div className="pt-4">
        <p className="text-lg pl-3">All Products ({(products).length})</p>
        <div className="flex flex-wrap pt-8">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};
