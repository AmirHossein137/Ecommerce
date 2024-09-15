import { IProduct } from "@/app/admin/dashboard/page";
import { setProduct } from "@/redux/features/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface PropsType {
  srNo: number;
  setOpenPop: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
  item: IProduct;
}

const ProductRow = ({ srNo, setOpenPop, setUpdateTable, item }: PropsType) => {
  const dispatch = useAppDispatch();
  const onEdit = () => {
    dispatch(setProduct(item));
    setOpenPop(true);
  };

  const onDelete = () => {};

  return (
    <tr>
      <td>
        <div>{srNo}</div>
      </td>
      <td>
        <div>{item.name}</div>
      </td>
      <td>
        <div>${item.price}</div>
      </td>
      <td className="py-2">
        <Image src={item.imgSrc} width={40} height={40} alt="Product_Image" />
      </td>
      <td>
        <div className="text-2xl flex items-center gap-2 text-gray-600">
          <button onClick={onEdit} className="bg-transparent border-0 p-0 hover:text-black">
            <Pencil />
          </button>
          <button onClick={onDelete} className="bg-transparent border-0 p-0 hover:text-black">
            <Trash2 />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
