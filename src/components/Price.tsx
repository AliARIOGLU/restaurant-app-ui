"use client";

import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const { price, options } = product;

  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState(0);

  const { addToCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (product.options?.length) {
      setTotal(
        quantity * price + product.options[selectedItem].additionalPrice
      );
    }
  }, [quantity, selectedItem, product.options, price]);

  const handleCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
      ...(product.options?.length && {
        optionTitle: product.options[selectedItem].title,
      }),
      quantity,
    });

    toast.success("The product added to cart");
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${total}</h2>
      <div className="flex gap-4">
        {options?.length &&
          options?.map((option, idx) => (
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
        <button
          onClick={handleCart}
          className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
