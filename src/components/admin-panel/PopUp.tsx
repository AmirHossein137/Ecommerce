import { setLoading } from "@/redux/features/loadingReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axios from "axios";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { CircleX } from "lucide-react";
import { Button, Input } from "@nextui-org/react";

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
      .put(`/api/edit_product/${productData._id}`, inputData)
      .then((res) => {
        console.log(res);
        toast.success("Product Updated Successfullt...");
        setUpdateTable((prevState) => !prevState);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setLoading(false));
        setOpenPop(false);
      });
    console.log(inputData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000070] grid place-items-center">
      <div className="bg-white w-[700px] py-8 rounded-lg p-5 text-center relative">
        <div
          className="absolute right-0 top-0 m-4 cursor-pointer transition duration-150 hover:text-rose-700"
          onClick={() => setOpenPop(false)}
        >
          <CircleX />
        </div>
        <h2 className="text-2xl">Edit Product</h2>
        <form
          className="flex flex-col gap-4 w-[80%] mx-auto mt-4 items-center justify-center"
          onSubmit={handleSubmit}
        >
          <Input
            classNames={{
              innerWrapper: "h-20",
            }}
            label="Product Name..."
            type="text"
            placeholder="Name"
            value={inputData.name}
            onChange={(e) =>
              setIputData({ ...inputData, name: e.target.value })
            }
            required
          />
          <Input
            type="text"
            classNames={{
              innerWrapper: "h-20",
            }}
            label="Product Category..."
            placeholder="Category"
            value={inputData.category}
            onChange={(e) =>
              setIputData({ ...inputData, category: e.target.value })
            }
            required
          />
          <Input
            classNames={{
              innerWrapper: "h-20",
            }}
            type="text"
            placeholder="Price"
            label="Product Price..."
            value={inputData.price}
            onChange={(e) =>
              setIputData({ ...inputData, price: e.target.value })
            }
            required
          />

          <Button color="success" className="w-full text-white" size="lg" >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PopUp;
