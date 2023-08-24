"use client"
import React from 'react'
import { useVinaTeaStore } from '../store/store'
import { CartItem } from './CartItem';
import stringToUSCurrency from '../helpers/convertCurrency';

export const Cart = () => {
    const cart = useVinaTeaStore((state) => state.cart);
    const items = cart?.products ?? [];

    return (
        <div className="max-w-lg mx-auto p-8 bg-white rounded-md shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-6 text-center">Your Cart ({cart?.cartCount} items)</h2>
            {items.map((item) => (
                <div key={item.productId}>
                    <CartItem item={item} />
                    <hr className="my-6" />
                </div>
            ))}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Total</h3>
                <p className="text-lg font-semibold">{stringToUSCurrency(cart?.currentTotal ?? 0)}</p>
            </div>
            <button className="w-full mt-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Checkout
            </button>
        </div>
    );
};

