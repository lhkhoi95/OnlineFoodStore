"use client";
import React from "react";
import ProductCard from "./ProductCard";
import ProductPageSkeleton from "@/app/loading";
import getAllProducts from "@/lib/product";

export const ProductsPage = () => {
  const { data, error, isLoading } = getAllProducts();
  if (isLoading) return <ProductPageSkeleton />;
  if (error) throw new Error("Failed to load products");

  const products: Product[] = data;

  return (
    <div className="mx-5 md:mx-20 lg:mx-26 xl:mx-56">
      <p className="text-lg font-medium text-center py-5">All Drinks ({products.length})</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 justify-items-center align-center">

        {products.map(product => (
          <div className="" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}

      </div>
    </div>
  );
};
