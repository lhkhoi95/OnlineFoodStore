import React from 'react'
import { InfoPopup } from './InforPopup'
import stringToUSCurrency from '../helpers/convertCurrency'
import { useVinaTeaStore } from '../store/store'

export const PricesCalculation = () => {
    const cart = useVinaTeaStore((state) => state.cart)
    const [isHovering, setIsHovering] = React.useState(false)
    const calculateTax = useVinaTeaStore((state) => state.calculateTax)
    const getDeliveryFee = useVinaTeaStore((state) => state.getDeliveryFee)
    const getFinalTotal = useVinaTeaStore((state) => state.getFinalTotal)

    return (
        <>
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">Subtotal</h3>
                <p className="tracking-wide font-semibold">{stringToUSCurrency(cart?.currentTotal ?? 0)}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
                <h3 className="font-semibold">Tax</h3>
                <p className="tracking-wide font-semibold">{calculateTax()}</p>
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
                        {isHovering && <InfoPopup text={'Order at least $12.00 from this store get $0 delivery fee.'} />}
                    </div>
                </h3>
                <p className="tracking-wide font-semibold">{getDeliveryFee()}</p>
            </div>
            <hr className="mt-6 w-full ml-auto" />
            <div className="flex justify-between items-center mt-2">
                <h3 className="text-lg font-semibold">Total</h3>
                <p className="text-lg tracking-wide font-semibold">{getFinalTotal()}</p>
            </div>
        </>
    )
}
