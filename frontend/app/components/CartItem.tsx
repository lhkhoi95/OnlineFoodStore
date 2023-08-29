"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useVinaTeaStore } from '../store/store';
import { getProductById } from '@/lib/product';
import { RemoveModal } from './Modal';
import stringToUSCurrency from '../helpers/convertCurrency';

export const CartItem = ({ item }: { item: ProductInCart }) => {
    const [product, setProduct] = useState<Product>();
    const [quantity, setQuantity] = useState<number>(item.quantity);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const addToStore = useVinaTeaStore((state) => state.addToStore);
    const setCart = useVinaTeaStore((state) => state.setCart);

    async function handleChange(e: React.ChangeEvent<HTMLSelectElement>, product: Product) {
        const value = parseInt(e.target.value);
        setQuantity(value);
        setIsUpdating(true);
        if (value === item.quantity) {
            console.log("NO CHANGE");
            setIsUpdating(false);
            return;
        }
        if (value > item.quantity) {
            console.log("ADDING TO CART")
            addToStore([{
                productId: product._id,
                price: product.price,
                quantity: value - item.quantity,
            }]);
        } else {
            console.log("REMOVING FROM CART")
            addToStore([{
                productId: product._id,
                price: product.price,
                quantity: value - item.quantity,
            }]);
        }
        await setCart();
        setIsUpdating(false);
    }

    async function handleRemove() {
        setShowModal(true);
    }

    // Hide modal on cancel
    function handleCancel() {
        setShowModal(false);
    }

    async function handleConfirm(product: Product) {
        setIsUpdating(true);
        // If user is logged in, remove from local cart and update db
        addToStore([{
            productId: product._id,
            price: product.price,
            quantity: -item.quantity,
        }]);

        await setCart();
        setIsUpdating(false);
        setShowModal(false);
    }

    useEffect(() => {
        getProductById(item.productId).then((data) => {
            setProduct(data);
        });
    }, [])

    if (!product) return <div className="text-xl">Loading...</div>;

    return (
        <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
                <Image
                    src={product.image[0]}
                    alt="Image by photographeeasia from Freepik"
                    loading="eager"
                    width={64}
                    height={64}
                    className="rounded-xl shadow-2xl hover:scale-110"
                    priority
                />
                <div className="h-fit ml-4">
                    <h3 className="text-md md:text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{stringToUSCurrency(product.price)}</p>
                    <select className="border w-16 text-center" name="quantity" id="quantityId" value={quantity} onChange={
                        (e) => handleChange(e, product)
                    } disabled={isUpdating}>
                        {[...Array(product.stock)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button type="button" className={`${isUpdating ? "text-gray-400" : "text-red-600"} hover:underline`}
                disabled={isUpdating}
                onClick={handleRemove}>Remove
            </button>
            {showModal && (
                <RemoveModal
                    onConfirm={() => handleConfirm(product)}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};