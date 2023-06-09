import { getQuantity, getTotal } from "@/utils/cartStorage";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import stringToUSCurrency from "../helpers/convertCurrency";
import { createSelector } from 'reselect';

const Cart = () => {
  const selectCartCount = (state: { cartCount: number; currentTotal: number }) => state.cartCount;
  const selectCurrentTotal = (state: { cartCount: number; currentTotal: number }) => state.currentTotal;

  const selectCartData = createSelector(
    [selectCartCount, selectCurrentTotal],
    (cartCount, currentTotal) => [cartCount, currentTotal]
  );

  const [cartCount, currentTotal] = useSelector(selectCartData);

  return (
    <>
      <Link
        href="/cart"
        title="View Cart"
        className={"hover:bg-slate-600 rounded-2xl p-3"}
      >
        <div className="flex flex-col items-center w-[100px] h-[40px]">
          <span className="relative ">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
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
            <div className="absolute text-xs top-[-15px] right-[-15px] bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center tracking-wider">
              {cartCount && (cartCount > 99 ? "99+" : cartCount)}
            </div>
          </span>

          <div className="text-sm pt-1 tracking-wider">
            {currentTotal ? stringToUSCurrency(currentTotal) : "$0.00"}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Cart;
