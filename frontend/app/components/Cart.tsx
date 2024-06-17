"use client";
import React from "react";
import { useVinaTeaStore } from "../store/store";
import { CartItem } from "./CartItem";
import { CheckOutButtonGroup } from "./CheckOutButtonGroup";
import { EmptyCart } from "./EmptyCart";
import { PricesCalculation } from "./PricesCalculation";
import Link from "next/link";
import getStripe from "@/utils/getStripejs";
import { getStripePriceId } from "@/utils/stripePriceId ";
import { getProductById } from "@/lib/product";

export const Cart = () => {
  const user = useVinaTeaStore((state) => state.user);
  const cart = useVinaTeaStore((state) => state.cart);
  const items = cart?.products ?? [];
  const cartIsEmpty = items.length === 0;
  let lineItems: LineItem[] = [];
  items.forEach(async (item) => {
    const productInfor = (await getProductById(item.productId)) as Product;
    const lineItem: LineItem = {
      price: getStripePriceId(productInfor._id),
      quantity: item.quantity,
    };
    lineItems.push(lineItem);
  });

  async function checkout(lineItems: LineItem[]) {
    const stripe = await getStripe();
    await stripe?.redirectToCheckout({
      lineItems: lineItems,
      mode: "payment",
      successUrl: `${window.location.origin}/payment_success`,
      cancelUrl: `${window.location.origin}/cart`,
      customerEmail: user?.email,
      billingAddressCollection: "required",
      shippingAddressCollection: {
        allowedCountries: ["US", "CA"],
      },
    });
  }

  return (
    <div className="mx-2 my-10 min-h-screen">
      <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-md lg:max-w-xl">
        <div className="w-fit rounded-full px-2 py-2 hover:bg-[#84593C] hover:text-white">
          <Link href="/order">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
        </div>
        {cartIsEmpty && <EmptyCart />}
        {!cartIsEmpty && (
          <div>
            <h2 className="mb-6 text-center text-lg font-semibold md:text-xl">
              Your Cart ({cart?.cartCount} items)
            </h2>
            {items.map((item: ProductInCart) => (
              <div key={item.productId}>
                <CartItem item={item} />
                <hr className="my-6" />
              </div>
            ))}
            <PricesCalculation />
            {user && (
              <button
                onClick={async () => {
                  await checkout(lineItems);
                }}
                type="button"
                className="mt-6 w-full rounded-full bg-[#84593C] py-2 text-white focus:ring-[#966F4A] dark:bg-[#84593C] dark:hover:bg-[#6E4F34] dark:focus:ring-[#966F4A]"
              >
                Checkout
              </button>
            )}
            {!user && <CheckOutButtonGroup />}
          </div>
        )}
      </div>
    </div>
  );
};
