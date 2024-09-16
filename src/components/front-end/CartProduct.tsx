import { useAppDispatch } from "@/redux/hooks";
import React from "react";
import { Trash2 } from "lucide-react";
import { removeFromCart } from "@/redux/features/cartSlice";

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

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center ga-4">
        <img className="h-[80px]" src={img} alt={title} />
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
