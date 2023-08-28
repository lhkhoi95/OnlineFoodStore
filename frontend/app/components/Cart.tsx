"use client"
import React from 'react'
import { useVinaTeaStore } from '../store/store'
import { CartItem } from './CartItem';
import { CheckOutButtonGroup } from './CheckOutButtonGroup';
import { EmptyCart } from './EmptyCart';
import { PricesCalculation } from './PricesCalculation';

export const Cart = () => {
    const user = useVinaTeaStore((state) => state.user);
    const cart = useVinaTeaStore((state) => state.cart);
    const items = cart?.products ?? [];
    const cartIsEmpty = items.length === 0;

    return (
        <div className="min-h-screen my-10 mx-2">
            <div className="max-w-md lg:max-w-lg mx-auto p-8 bg-white rounded-xl shadow-md">
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
                            <button className="w-full mt-6 py-2 bg-[#84593C] focus:ring-[#966F4A] dark:bg-[#84593C] dark:hover:bg-[#6E4F34] dark:focus:ring-[#966F4A] text-white rounded-full">
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
