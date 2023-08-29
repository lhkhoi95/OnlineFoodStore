"use client"
import Link from 'next/link'
import React from 'react'

export const OrderButton = () => {
    return (
        <Link
            href="/order"

            className="w-fit my-5 mb-16 px-2 md:px-5 tracking-wide md:tracking-wider text-sm shadow-lg shadow-slate-400 py-2.5 mx-auto text-white bg-gradient-to-r from-[#84593C] to-[#a87b5c] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-center inline-flex items-center dark:hover:from-[#6E4F34] dark:hover:to-[#84593C] dark:focus:ring-[#966F4A]">
            ORDER NOW
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
        </Link>
    )
}
