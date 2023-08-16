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
    <div>
      <p className="text-lg pl-3 pt-10">All Products ({products.length})</p>
      <div className="flex flex-wrap justify-center pt-2 mx-auto">
        {products.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
