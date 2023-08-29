"use client"
import React from 'react'
import { useVinaTeaStore } from '../store/store'
import { CartItem } from './CartItem';
import { CheckOutButtonGroup } from './CheckOutButtonGroup';
import { EmptyCart } from './EmptyCart';
import { PricesCalculation } from './PricesCalculation';
import Link from 'next/link';

export const Cart = () => {
    const user = useVinaTeaStore((state) => state.user);
    const cart = useVinaTeaStore((state) => state.cart);
    const items = cart?.products ?? [];
    const cartIsEmpty = items.length === 0;

    return (
        <div className="min-h-screen my-10 mx-2">
            <div className="max-w-md lg:max-w-xl mx-auto p-8 bg-white rounded-xl shadow-md">
                <div className='hover:bg-[#84593C] hover:text-white w-fit rounded-full py-2 px-2'>
                    <Link href="/order">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </Link>
                </div>
                {cartIsEmpty && <EmptyCart />}
                {!cartIsEmpty && (
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold mb-6 text-center">Your Cart ({cart?.cartCount} items)</h2>
                        {items.map((item: ProductInCart) => (
                            <div key={item.productId}>
                                <CartItem item={item} />
                                <hr className="my-6" />
                            </div>
                        ))}
                        <PricesCalculation />
                        {user && (
                            <button type="button" className="w-full mt-6 py-2 bg-[#84593C] focus:ring-[#966F4A] dark:bg-[#84593C] dark:hover:bg-[#6E4F34] dark:focus:ring-[#966F4A] text-white rounded-full">
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
