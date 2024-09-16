import { addToCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";
import toast from "react-hot-toast";
import { Star , ShoppingCart } from 'lucide-react';

interface PropsType {
  id: string;
  img: string;
  title: string;
  price: number;
  category: string;
}

const ProductCard: React.FC<PropsType> = ({
  id,
  img,
  title,
  price,
  category,
}) => {
  const dispatch = useAppDispatch();
  const addProductToCart = () => {
    const payload = {
      id,
      img,
      title,
      price,
      category,
      quantity: 1,
    };
    dispatch(addToCart(payload));
    toast.success("Added To Cart");
  };

  return (
    <div className="border border-gray-200">
      <div className="text-center border-b border-gray-200 ">
        <img className="inline-block" src={img} alt={title} />
      </div>
      <div className="px-8 py-4">
        <p className="text-gray-500 text-sm font-medium">{category}</p>
        <h2 className="font-medium">{title}</h2>
        <div className="mt-3 flex text-[#ffb21d] items-center">
            <Star />
            <Star />
            <Star />
            <Star />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h2>${price}</h2>
        <div className="flex gap-2 items-center bg-pink-600 text-white px-4 py-2 cursor-pointer hover:bg-blue-600"
        onClick={addProductToCart}
        >
            <ShoppingCart  />
            Add To Cart

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
