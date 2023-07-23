"use client";

import { useState, useEffect } from "react";

type PriceProps = {
  id: number;
  price: number;
  options?: {
    title: string;
    additionalPrice: number;
  }[];
};

const Price: React.FC<PriceProps> = ({ id, price, options }) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    setTotal(
      quantity *
        (options ? price + options[selectedItem].additionalPrice : price)
    );
  }, [quantity, selectedItem, options, price]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${total.toFixed(2)}</h2>
      <div className="flex gap-4">
        {options?.map((option, idx) => (
          <button
            onClick={() => setSelectedItem(idx)}
            className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
            style={{
              background: selectedItem === idx ? "rgb(248 113 113)" : "white",
              color: selectedItem === idx ? "white" : "red",
            }}
            key={option.title}
          >
            {option.title}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
