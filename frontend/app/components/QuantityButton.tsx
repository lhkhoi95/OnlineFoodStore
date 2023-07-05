import React, { useState, useEffect } from "react";

export const QuantityButton: React.FC<QuantityButtonProps> = ({
  handleClick,
  product,
  showQuantityButton,
}) => {
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (quantity === 0) {
      showQuantityButton(false);
    }
  }, [quantity]);

  return (
    <div
      className={`flex items-center  w-[120px] h-[40px] justify-between bg-blue-600 rounded-full`}
      onMouseLeave={() => showQuantityButton(false)}
      onMouseEnter={() => showQuantityButton(true)}
    >
      <button
        onMouseEnter={() => showQuantityButton(true)}
        className="bg-blue-500 rounded-full p-2 w-[40px]"
        onClick={() => {
          setQuantity(quantity - 1);
          handleClick(false, product);
        }}
      >
        -
      </button>
      {quantity}
      <button
        onMouseEnter={() => showQuantityButton(true)}
        className="bg-blue-500 rounded-full p-2 w-[40px]"
        onClick={() => {
          {
            setQuantity(quantity + 1);
          }
          handleClick(true, product);
        }}
      >
        +
      </button>
    </div>
  );
};
