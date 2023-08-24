import React, { useState, useEffect } from "react";
import { useVinaTeaStore } from "../store/store";

export const QuantityButton: React.FC<QuantityButtonProps> = ({
  handleClick,
  product,
  showQuantityButton,
}) => {
  const getQuantityById = useVinaTeaStore((state) => state.getQuantityByProductId);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isLoading = useVinaTeaStore((state) => state.isLoading);
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
        className={`${isLoading ? "bg-[#84593cac]" : "bg-[#aa6b42]"
          } rounded-full p-2 w-[40px] h-[40px]`}
        onClick={() => {
          setQuantity(quantity - 1);
          handleClick(false, product);
        }}
      >
        -
      </button>
      <span className="w-[10px] text-white">{quantity}</span>
      <button
        disabled={isDisabled}
        className={`${isDisabled ? "bg-[#482e1edb]" : "bg-[#aa6b42]"
          } rounded-full p-2 w-[40px] h-[40px]`}
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
    <button className="bg-[#84593C] rounded-full p-2 w-[40px]">
      {quantity}
    </button>
  );
  return (
    <div
      className={`flex items-center h-[40px] justify-between bg-[#84593C] text-white rounded-full ${isHovered
        ? "w-full transition-width duration-200"
        : "w-[40px] transition-width duration-200"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? extendedQuantityButton : quantityButton}
    </div>
  );
};
