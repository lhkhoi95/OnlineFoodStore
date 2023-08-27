"use client"
import React, { useEffect, useState } from 'react'
import { useVinaTeaStore } from '../store/store'
import { CartItem } from './CartItem';
import stringToUSCurrency from '../helpers/convertCurrency';
import Image from 'next/image';
import { InforPopup } from './InforPopup';

export const Cart = () => {
    const user = useVinaTeaStore((state) => state.user);
    const cart = useVinaTeaStore((state) => state.cart);
    const taxRate = useVinaTeaStore((state) => state.TAX_RATE);
    const getDeliveryFee = useVinaTeaStore((state) => state.getDeliveryFee);
    const getFinalTotal = useVinaTeaStore((state) => state.getFinalTotal);
    const items = cart?.products ?? [];
    const isEmpty = items.length === 0;
    const [isHovering, setIsHovering] = useState(false);

    function calculateTaxes() {
        return stringToUSCurrency((cart?.currentTotal ?? 0) * taxRate);
    }

    return (
        <div className="min-h-screen my-10 mx-2">
            <div className="max-w-md lg:max-w-lg mx-auto p-8 bg-white rounded-xl shadow-md">

                {isEmpty && (
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold mb-6 text-center">Your Cart Is Empty!</h2>
                        <div className='h-full'>
                            <Image
                                src="/images/empty_cart.png"
                                alt="Empty cart image"
                                width={300}
                                height={300}
                                className="mx-auto"
                                priority
                            />
                            <button className="w-full mt-6 py-2 bg-[#84593C] focus:ring-[#966F4A] dark:bg-[#84593C] dark:hover:bg-[#6E4F34] dark:focus:ring-[#966F4A] text-white rounded-full"
                                onClick={() => {
                                    window.location.href = "/";
                                }}>
                                Let's get some drinks!
                            </button>
                        </div>
                    </div>

                )}
                {!isEmpty && (
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold mb-6 text-center">Your Cart ({cart?.cartCount} items)</h2>
                        {items.map((item) => (
                            <div key={item.productId}>
                                <CartItem item={item} />
                                <hr className="my-6" />
                            </div>
                        ))}
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Subtotal</h3>
                            <p className="tracking-wide font-semibold">{stringToUSCurrency(cart?.currentTotal ?? 0)}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <h3 className="font-semibold">Tax</h3>
                            <p className="tracking-wide font-semibold">{calculateTaxes()}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <h3 className="flex items-center justify-center space-x-1 font-semibold">
                                <p>
                                    Delivery
                                </p>
                                <div className='items-start' onMouseEnter={
                                    () => setIsHovering(true)
                                } onMouseLeave={() => setIsHovering(false)
                                }>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50">
                                        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
                                    </svg>
                                    {isHovering && <InforPopup text={'Order at least $12.00 from this store get $0 delivery fee.'} />}
                                </div>
                            </h3>
                            <p className="tracking-wide font-semibold">{getDeliveryFee()}</p>
                        </div>
                        <hr className="mt-2 w-full ml-auto" />
                        <div className="flex justify-between items-center mt-2">
                            <h3 className="text-lg font-semibold">Total</h3>
                            <p className="text-lg tracking-wide font-semibold">{getFinalTotal()}</p>
                        </div>
                        {user && (
                            <button className="w-full mt-6 py-2 bg-[#84593C] focus:ring-[#966F4A] dark:bg-[#84593C] dark:hover:bg-[#6E4F34] dark:focus:ring-[#966F4A] text-white rounded-full">
                                Checkout
                            </button>
                        )}
                        {!user && (
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
                        )}

                    </div>
                )}

            </div>
        </div>
    );
};
