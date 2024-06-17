import React from "react";
import CheckOutForm from "./CheckOutForm";

export const CheckOutButtonGroup = () => {
  return (
    <div>
      <button
        className="mt-6 w-full rounded-full bg-[#84593C] py-2 text-white focus:ring-[#966F4A] dark:bg-[#84593C] dark:hover:bg-[#6E4F34] dark:focus:ring-[#966F4A]"
        onClick={() => {
          window.location.href = "/login";
        }}
      >
        Login to checkout
      </button>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="mx-12 w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2">Or</span>
        </div>
      </div>
      <button
        className="w-full rounded-full bg-[#84593C] py-2 text-white focus:ring-[#966F4A] dark:bg-[#84593C] dark:hover:bg-[#6E4F34] dark:focus:ring-[#966F4A]"
        onClick={() => {}}
      >
        Check out as guest
      </button>
    </div>
  );
};
