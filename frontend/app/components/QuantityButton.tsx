import React, { useState, useEffect } from "react";
import { useGrocerStore } from "../store/store";

export const QuantityButton: React.FC<QuantityButtonProps> = ({
  handleClick,
  product,
  showQuantityButton,
}) => {
  const getQuantityById = useGrocerStore((state) => state.getQuantityByProductId);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isLoading = useGrocerStore((state) => state.isLoading);
  const [quantity, setQuantity] = useState<number>(getQuantityById(product._id));
  const isDisabled = quantity >= product.stock || isLoading;

  useEffect(() => {
    if (!isLoading) {
      setQuantity(getQuantityById(product._id));
      if (quantity === 0) showQuantityButton(false);
    }
  }, [isLoading, quantity])

  const extendedQuantityButton = (
    <>
      <button
        disabled={isLoading}
        className={`bg-${isLoading ? "slate-600" : "blue-500"
          } rounded-full p-2 w-[40px]`}
        onClick={() => {
          setQuantity(quantity - 1);
          handleClick(false, product);
        }}
      >
        -
      </button>
      <span className="w-[10px]">{quantity}</span>
      <button
        disabled={isDisabled}
        className={`bg-${isDisabled ? "slate-600" : "blue-500"
          } rounded-full p-2 w-[40px]`}
        onClick={() => {
          {
            setQuantity(quantity + 1);
          }
          handleClick(true, product);
        }}
      >
        +
      </button>
    </>
  );

  const quantityButton = (
    <button className="bg-blue-500 rounded-full p-2 w-[40px]">
      {quantity}
    </button>
  );
  return (
    <div
      className={`flex items-center h-[40px] justify-between bg-blue-600 rounded-full ${isHovered
        ? "w-[120px] transition-width duration-200"
        : "w-[40px] transition-width duration-200"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? extendedQuantityButton : quantityButton}
    </div>
  );
};
