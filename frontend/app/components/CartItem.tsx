"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'


export const CartItem = ({ item }: { item: ProductInCart }) => {
    const [product, setProduct] = useState<Product>();

    async function getData() {
        const res = await fetch(`http://localhost:3000/products/${item.productId}`);

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        return res.json()
    }

    useEffect(() => {
        getData().then((data) => {
            setProduct(data);
        });
    }, [])

    if (!product) return <div className="text-xl">Loading...</div>;

    return (
        <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
                <Image src={product.image[0]} width={64} height={64} alt="Image by photographeeasia from Freepik" />
                <div className="ml-4">
                    <h3 className="text-md md:text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">${product.price}</p>
                    <input className="border w-12 text-center" type="text" name="quantity" id="quantityId" value={item.quantity} readOnly />
                </div>
            </div>
            <button className="text-red-600 hover:underline">Remove</button>
        </div>
    );
};