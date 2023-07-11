import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const QuantityButton: React.FC<QuantityButtonProps> = ({
  handleClick,
  product,
  showQuantityButton,
}) => {
  // console.log(getQuantityById(product._id));
  const products: ProductInCart[] = useSelector(
    (state: Cart) => state.products
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    if (quantity === 0) {
      showQuantityButton(false);
    } else {
      showQuantityButton(true);
      products.forEach((prod) => {
        if (prod.id === product._id) {
          setQuantity(prod.quantity);
        }
      });
    }
  }, [quantity]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // This code will only run on the client-side
      console.log("Client-side rendering");
    } else {
      // This code will run on the server-side
      console.log("Server-side rendering");
    }
  }, []);
  const largeQuantityButton = (
    <>
      <button
        className="bg-blue-500 rounded-full p-2 w-[40px]"
        onClick={() => {
          setQuantity(quantity - 1);
          handleClick(false, product);
        }}
      >
        -
      </button>
      <span className="w-[10px]">{quantity}</span>
      <button
        disabled={quantity >= product.stock}
        className={`bg-${
          quantity >= product.stock ? "slate-600" : "blue-500"
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

  const smallQuantityButton = (
    <button className="bg-blue-500 rounded-full p-2 w-[40px]">
      {quantity}
    </button>
  );
  return (
    <div
      className={`flex items-center h-[40px] justify-between bg-blue-600 rounded-full ${
        isHovered
          ? "w-[120px] transition-width duration-200"
          : "w-[40px] transition-width duration-200"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? largeQuantityButton : smallQuantityButton}
    </div>
  );
};
