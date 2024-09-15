import { setLoading } from "@/redux/features/loadingReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axios from "axios";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { CircleX } from "lucide-react";

interface PropsType {
  setOpenPop: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
}

const PopUp = ({ setOpenPop, setUpdateTable }: PropsType) => {
  const productData = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const [inputData, setIputData] = useState({
    name: productData.name,
    category: productData.category,
    price: productData.price,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    axios
      .post(`/api/edit_product/${productData._id}`, inputData)
      .then((res) => {
        toast.success("Product Updated Successfullt...");
        setUpdateTable((prevState) => !prevState);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setLoading(false));
        setOpenPop(false);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000070] grid place-items-center">
      <div className="bg-white w-[700px] py-8 rounded-lg text-center relative">
        <div
          className="absolute right-0 top-0 m-4 cursor-pointer"
          onClick={() => setOpenPop(false)}
        >
          <CircleX />
        </div>
        <h2 className="text-2xl -m-3">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
            type="text"
            placeholder="Name"
            value={inputData.name}
            onChange={(e) =>
              setIputData({ ...inputData, name:e.target.value })
            }
            required
          />
          <input
            className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
            type="text"
            placeholder="Category"
            value={inputData.category}
            onChange={(e) =>
              setIputData({ ...inputData, category: e.target.value })
            }
            required
          />
          <input
            className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
            type="text"
            placeholder="Price"
            value={inputData.price}
            onChange={(e) =>
              setIputData({ ...inputData, price: e.target.value })
            }
            required
          />
          <div className="flex justify-end">
            <button className="bg-blue-700 block text-white px-8 py-2 rounded-lg self-center">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUp;
