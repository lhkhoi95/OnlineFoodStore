
"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import PillButton from './Button';

function displayName(prodName: string) {
    if (prodName.length > 75) {
        return prodName.slice(0, 55) + '...';
    }
    return prodName;
}

function addToCart() {
    console.log('Added to cart');
}


export default function Card({ product }: { product: Product }) {
    return (
        <div key={product._id} className="flex items-center w-[250px] h-[350px] m-3">
            <Link
                href="#"
                className="p-6 h-[350px] w-[250px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <div className="rounded-lg overflow-hidden">
                    <Image
                        src={product.image[0]}
                        width={500}
                        height={500}
                        alt={product.name}
                        priority={true}
                        title={product.name}
                    />
                </div>
                <div className="text-gray-300 font-bold pt-2">
                    {displayName(product.name)} {product.stock === 0 ? <div className="text-red-500 pt-1">Out of Stock</div> : <div className="text-green-500 pt-1" >In Stock</div>}
                </div>
                <div className="flex items-center justify-between pt-2">
                    <div className="font-bold text-2xl ">
                        {`$${product.price}`}
                    </div>
                    <div><PillButton label="Add to Cart" onClick={addToCart} /></div>
                </div>
            </Link>
        </div>
    )
}
