import Link from "next/link";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const [cartCount, currentTotal] = useSelector(
    useMemo(() => {
      return (state: { cartCount: number; currentTotal: number }) => [
        state.cartCount,
        state.currentTotal,
      ];
    }, [])
  );

  return (
    <>
      <Link
        href="/cart"
        title="View Cart"
        className={"hover:bg-slate-600 rounded-2xl p-3"}
      >
        <div className="relative flex flex-col items-center">
          <div>
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
            <div className="absolute text-xs top-[-10px] right-[-10px] bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center">
              {cartCount > 99 ? "99+" : cartCount}
            </div>
          </div>
          <div className="text-sm pt-1">${currentTotal.toFixed(2)}</div>
        </div>
      </Link>
    </>
  );
};

export default Cart;
