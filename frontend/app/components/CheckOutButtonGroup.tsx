import React from 'react'

export const CheckOutButtonGroup = () => {
    return (
        <div>
            <button className="w-full mt-6 py-2 bg-[#84593C] focus:ring-[#966F4A] dark:bg-[#84593C] dark:hover:bg-[#6E4F34] dark:focus:ring-[#966F4A] text-white rounded-full"
                onClick={() => {
                    window.location.href = "/login";
                }}>
                Login to checkout
            </button>
            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="mx-12 w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white">Or</span>
                </div>
            </div>
            <button className="w-full py-2 bg-[#84593C] focus:ring-[#966F4A] dark:bg-[#84593C] dark:hover:bg-[#6E4F34] dark:focus:ring-[#966F4A] text-white rounded-full"
                onClick={() => {

                }}>
                Check out as guest
            </button>
        </div>
    )
}
