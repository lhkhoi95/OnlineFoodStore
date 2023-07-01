import { getTotal } from '@/utils/cartState'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import cartStyles from '@/styles/Cart.module.css'
import { useShoppingCart } from "use-shopping-cart";

type Props = {}

const Cart = (props: Props) => {
    const [total, setTotal] = useState<number>(0.00)
    useEffect(() => {
        setTotal(getTotal())
    }, [total])
    const { shouldDisplayCart } = useShoppingCart();
    return (
        <>

            <Link href='/cart' title='View Cart' className={`${cartStyles.cart} hover:bg-slate-600 rounded-2xl p-2`}>
                <div className='flex flex-col items-center'>
                    <div className={`bg-white flex flex-col absolute right-3 md:right-9 top-14 w-80 py-4 px-4 shadow-[0_5px_15px_0_rgba(0,0,0,.15)] rounded-md transition-opacity duration-500 ${!shouldDisplayCart ? "opacity-100" : "opacity-0"
                        }`}>

                    </div>
                    <div>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
                        </svg>
                    </div>

                    <div className='text-sm pt-1'>
                        ${total.toFixed(2)}
                    </div>
                </div>
            </Link>
        </>

    )
}

export default Cart