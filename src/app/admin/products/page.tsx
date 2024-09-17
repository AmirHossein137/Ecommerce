import ProductForm from "@/components/admin-panel/ProductForm";
import React from "react";

const Product = () => {
  return (
    <div className="h-full w-full bg-white rounded-lg grid place-items-center overflow-y-auto">
      <div className="bg-gray-50 border border-gray-200 shadow-md w-[600px] max-w-full rounded-lg p-4">
        <ProductForm />
      </div>
    </div>
  );
};

export default Product;
