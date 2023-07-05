"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PillButton from "./Button";
import { useDispatch } from "react-redux";
import { QuantityButton } from "./QuantityButton";
import { addProductToCart } from "@/utils/cartStorage";

function displayName(prodName: string) {
  if (prodName.length > 60) {
    return prodName.slice(0, 55) + "...";
  }
  return prodName;
}

export default function ProductCard({ product }: { product: Product }) {
  const [showQuantityButton, setShowQuantityButton] = useState<boolean>(false);

  const dispatch = useDispatch();

  function handleAddToCart(add: boolean, product: Product) {
    setShowQuantityButton(true);

    let type = "";
    if (add) {
      type = "INCREMENT_CART_COUNT";
    } else {
      type = "DECREMENT_CART_COUNT";
    }

    // Add to local storage
    addProductToCart(product);
    const addedProduct: ProductsInCart = {
      id: product._id,
      price: product.price,
      quantity: 1,
    };
    dispatch({
      type: type,
      payload: addedProduct,
    });
  }

  return (
    <div
      key={product._id}
      className="flex items-center h-[380px] w-[250px] m-3"
    >
      <div className="p-6 h-[380px] w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
        <Link href="#">
          <div className="rounded-lg overflow-hidden">
            <Image
              src={product.image[0]}
              width={500}
              height={500}
              alt={product.name}
              priority={true}
              title={product.name}
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
        <div className="font-bold text-base mt-1">{`$${product.price}`}</div>
        <div className="text-gray-300 font-bold pt-1">
          {product.stock === 0 ? (
            <div className="text-red-500">Out of Stock</div>
          ) : (
            <div className="text-green-500">In Stock</div>
          )}
        </div>
        <div>{displayName(product.name)}</div>
      </div>
    </div>
  );
}
