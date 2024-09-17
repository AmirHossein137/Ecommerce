"use client";
import { setLoading } from "@/redux/features/loadingReducer";
import { useAppDispatch } from "@/redux/hooks";
import { UploadButton } from "@/utils/uploadthing";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface IPayload {
  imgSrc: null | string;
  fileKey: null | string;
  name: string;
  category: string;
  price: string;
}

const ProductForm = () => {
  const [payload, setPayload] = useState<IPayload>({
    imgSrc: null,
    fileKey: null,
    name: "",
    category: "",
    price: "",
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true)),
      axios
        .post("/api/add_product", payload)
        .then((res) => {
          console.log(res);
          toast.success("Product Added SuccessFully...");
          setPayload({
            imgSrc: null,
            fileKey: null,
            name: "",
            category: "",
            price: "",
          });
          router.push("/admin/dashboard");
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(setLoading(false)));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-4">
        <Image
          className="max-h-[300px] w-auto object-contain rounded-md"
          src={payload.imgSrc ? payload.imgSrc : "/placeholder.png"}
          alt="product_image"
          width={800}
          height={500}
        />
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log(res);
            setPayload({
              ...payload,
              imgSrc: res[0]?.url,
              fileKey: res[0]?.key,
            });
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
      <div>
        <Input
          label="Product Name..."
          classNames={{
            innerWrapper: "h-20",
          }}
          type="text"
          value={payload.name}
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Input
          label="Product Category..."
          classNames={{
            innerWrapper: "h-20",
          }}
          type="text"
          value={payload.category}
          onChange={(e) => setPayload({ ...payload, category: e.target.value })}
          required
        />
      </div>
      <div>
        <Input
          label="Product Price..."
          classNames={{
            innerWrapper: "h-20",
          }}
          type="text"
          value={payload.price}
          onChange={(e) => setPayload({ ...payload, price: e.target.value })}
          required
        />
      </div>
      <div>
        <Button
          type="submit"
          className="w-full text-white"
          size="lg"
          color="success"
        >
          Add
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
