import React from 'react'
import Image from 'next/image'

export const EmptyCart = () => {
    return (
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
                        window.location.href = "/order";
                    }}>
                    Let's get some drinks!
                </button>
            </div>
        </div>
    )
}
