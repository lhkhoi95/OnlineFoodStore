"use client";
import { clearDBCart } from "@/lib/cart";
import { clearLocalCart } from "@/utils/cartStorage";
import React, { useEffect } from "react";
import { useVinaTeaStore } from "../store/store";
import Image from "next/image";
import PillButton from "./Button";
import stringToUSCurrency from "../helpers/convertCurrency";

export default function PaymentSuccess() {
  const user = useVinaTeaStore((state) => state.user);
  const cart = useVinaTeaStore((state) => state.cart);

  const handleClick = () => {
    if (user && cart) {
      clearLocalCart();

      const clearCart = async () => {
        try {
          await clearDBCart(user.accessToken);
          console.log("Cleared database cart");
        } catch (error) {
          console.error(error);
        }
      };
      clearCart();
    }
    window.location.href = "/";
  };
  const total = stringToUSCurrency(cart?.currentTotal ?? 0);
  const date = "2024-06-17 12:00:00";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-[20%] rounded-2xl bg-white p-4 text-center">
        <div className="mx-auto my-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 py-5">
          <Image
            src="/images/green-mark.jpg"
            width={512}
            height={512}
            alt="Payment OK"
            className="h-12 w-12 rounded-full"
          />
        </div>

        <h1 className="text-lg text-gray-500">Payment Success!</h1>
        <h2 className="text-2xl font-semibold">{total}</h2>
        <hr className="my-4 border-gray-300" />
        {/* Two columns layout */}
        <div className="my-2 flex justify-between space-x-24">
          <div className="text-left text-gray-500">Ref Number</div>
          <div className="text-right font-semibold">00000123456789</div>
        </div>
        <div className="my-2 flex justify-between space-x-24">
          <div className="text-left text-gray-500">Payment Time</div>
          <div className="text-right font-semibold">{date}</div>
        </div>
        <div className="my-2 flex justify-between space-x-24">
          <div className="text-left text-gray-500">Payment Method</div>
          <div className="text-right font-semibold">Bank Transfer</div>
        </div>
        <div className="my-2 flex justify-between space-x-24">
          <div className="text-left text-gray-500">Sender Email</div>
          <div className="text-right font-semibold">{user?.email}</div>
        </div>
        <span className="w-10">
          <PillButton label={"Go to HomePage"} handleClick={handleClick} />
        </span>
      </div>
    </div>
  );
}
