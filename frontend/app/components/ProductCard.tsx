"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PillButton from "./Button";
import { QuantityButton } from "./QuantityButton";
import stringToUSCurrency from "../helpers/convertCurrency";
import { useVinaTeaStore } from "../store/store";

export default function ProductCard({ product }: { product: Product }) {
  const [showQuantityButton, setShowQuantityButton] = useState(false);
  const addToStore = useVinaTeaStore((state) => state.addToStore);
  const setCart = useVinaTeaStore((state) => state.setCart);
  const cart = useVinaTeaStore((state) => state.cart);
  const getQuantityById = useVinaTeaStore((state) => state.getQuantityByProductId);
  const isLoading = useVinaTeaStore((state) => state.isLoading);

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
      className="flex items-center h-[380px] w-[250px] m-3 shadow-2xl rounded-xl bg-[#E6CAB1] border-2 border-[#E6D4C3] hover:border-[#E6CAB1] transition duration-200"
    >
      <div className="h-[380px] w-[250px] bg-[#E6CAB1] rounded-xl">
        <Link href={`/product/${product._id}`}>
          <div className="group rounded-lg overflow-hidden bg-[#E6D4C3]">
            <Image
              src={product.image[0]}
              width={200}
              height={300}
              alt="Image by photographeeasia from Freepik"
              priority={true}
              title={product.name}
              className="inset-0 h-[200px] w-[300px] object-scale-down transition duration-200 group-hover:scale-110"
            />
          </div>
        </Link>
        <div className="p-6">
          <div className="font-bold mt-1 tracking-wider">{`${stringToUSCurrency(
            product.price
          )}`}</div>
          <div className="text-gray-300 pt-1">
            {product.stock === 0 ? (
              <div className="text-red-500">Out of Order</div>
            ) : (
              <div className="text-green-800">Available</div>
            )}
          </div>
          <div className="text-lg font-sans text-sand-400 font-semibold tracking-wide">{product.name}</div>
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
        </div>

      </div>
    </div>
  );
}
