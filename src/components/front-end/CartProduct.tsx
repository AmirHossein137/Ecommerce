import { useAppDispatch } from "@/redux/hooks";
import React from "react";
import { Trash2 } from "lucide-react";
import { removeFromCart } from "@/redux/features/cartSlice";
import Image from "next/image";

interface PropsTypes {
  id: string;
  img: string;
  title: string;
  quantity: number;
  price: number;
}

const CartProduct: React.FC<PropsTypes> = ({
  id,
  img,
  title,
  quantity,
  price,
}) => {
  const dispatch = useAppDispatch();

  console.log(id);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Image className="w-[80px] h-[80px] rounded-xl" src={img} alt={title} />
        <div className="space-y-2">
          <h3 className="font-medium">{title}</h3>
          <p className="text-gray-600 text-sm">
            {quantity} x ${price}.00
          </p>
        </div>
      </div>
      <button onClick={() => dispatch(removeFromCart(id))}>
        <Trash2 />
      </button>
    </div>
  );
};

export default CartProduct;
