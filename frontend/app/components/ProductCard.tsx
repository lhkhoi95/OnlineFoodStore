"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PillButton from "./Button";
import { QuantityButton } from "./QuantityButton";
import stringToUSCurrency from "../helpers/convertCurrency";
import { useGrocerStore } from "../store/store";

export default function ProductCard({ product }: { product: Product }) {
  const [showQuantityButton, setShowQuantityButton] = useState(false);
  const addToStore = useGrocerStore((state) => state.addToStore);
  const setCart = useGrocerStore((state) => state.setCart);
  const cart = useGrocerStore((state) => state.cart);
  const getQuantityById = useGrocerStore((state) => state.getQuantityByProductId);
  const isLoading = useGrocerStore((state) => state.isLoading);

  useEffect(() => {
    if (!isLoading && cart && cart.products.length > 0) {
      const quantity = getQuantityById(product._id);
      if (quantity > 0) {
        setShowQuantityButton(true);
      }
    }
  }, [isLoading, cart])

  async function handleAddToCart(add: boolean, product: Product) {
    setShowQuantityButton(true);
    if (add) {
      console.log("ADDING TO CART")
      addToStore([{
        productId: product._id,
        price: product.price,
        quantity: 1,
      }]);
    } else {
      console.log("REMOVING FROM CART")
      addToStore([{
        productId: product._id,
        price: product.price,
        quantity: -1,
      }]);
    }
    await setCart();
  }

  return (
    <div
      key={product._id}
      className="flex items-center h-[380px] w-[250px] m-3"
    >
      <div className="p-6 h-[380px] w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
        <Link href={`/product/${product._id}`}>
          <div className="group rounded-lg overflow-hidden">
            <Image
              src={product.image[0]}
              width={500}
              height={500}
              alt={product.name}
              priority={true}
              title={product.name}
              className="inset-0 h-full w-full object-cover transition duration-200 group-hover:scale-110"
            />
          </div>
        </Link>
        <div className="mt-2">
          {showQuantityButton ? (
            <QuantityButton
              handleClick={handleAddToCart}
              product={product}
              showQuantityButton={setShowQuantityButton}
            />
          ) : (
            <PillButton
              label="Add to Cart"
              disable={product.stock === 0 ? true : false}
              handleClick={() => handleAddToCart(true, product)}
            />
          )}
        </div>
        <div className="font-bold text-base mt-1">{`${stringToUSCurrency(
          product.price
        )}`}</div>
        <div className="text-gray-300 font-bold pt-1">
          {product.stock === 0 ? (
            <div className="text-red-500">Out of Stock</div>
          ) : (
            <div className="text-green-500">In Stock</div>
          )}
        </div>
        <div className="line-clamp-2">{product.name}</div>
      </div>
    </div>
  );
}
