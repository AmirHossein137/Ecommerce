import { addToCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";
import toast from "react-hot-toast";
import { Star , ShoppingCart } from 'lucide-react';
import {Button} from "@nextui-org/react";
import Image from "next/image";

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
    <div className="border border-gray-200 p-5 rounded-lg">
      <div className="text-center border-b border-gray-200 ">
        <Image width={500} height={500} className="w-full h-80 object-contain rounded-lg" src={img} alt={title} />
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
        <h2 className="text-lg font-bold text-slate-800">${price}</h2>
        <Button color="danger" className="flex gap-2 items-center text-white px-4 py-2 cursor-pointer transition duration-200 hover:bg-pink-800"
        onClick={addProductToCart}
        >
            <ShoppingCart  />
            Add To Cart

        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
