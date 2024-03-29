"use client";
import Link from "next/link";
import stringToUSCurrency from "../helpers/convertCurrency";
import { useVinaTeaStore } from "../store/store";

export function CartIcon() {
  const cart = useVinaTeaStore((state) => state.cart);

  return (
    <>
      <Link
        href="/cart"
        title="View Cart"
        className={"hover:bg-zinc-400 rounded-2xl p-3"}
      >
        <div className="flex flex-col items-center w-[20px] md:w-[100px] h-[40px]">
          <span className="relative ">
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"
              />
            </svg>
            <div className="absolute text-xs top-[-15px] right-[-15px] bg-neutral-500 rounded-full w-6 h-6 flex items-center justify-center tracking-wider">
              {cart?.cartCount
                ? cart?.cartCount > 99
                  ? "99+"
                  : cart?.cartCount
                : "0"}
            </div>
          </span>

          <div className="text-sm pt-1 tracking-wider">
            {cart?.currentTotal
              ? stringToUSCurrency(Math.abs(cart?.currentTotal))
              : "$0.00"}
          </div>
        </div>
      </Link>
    </>
  );
}
