"use client";
import PopUp from "@/components/admin-panel/PopUp";
import ProductRow from "@/components/admin-panel/ProductRow";
import { setLoading } from "@/redux/features/loadingReducer";
import { useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import React, { useEffect, useState } from "react";

export interface IProduct {
  _id: "";
  imgSrc: "";
  fileKey: "";
  name: "";
  price: "";
  category: "";
}

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [openPop, setOpenPop] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get("/api/get_products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  }, [updateTable , dispatch]);

  return (
    <div className="bg-white h-full rounded-lg p-4">
      <h2 className="text-3xl font-bold text-slate-800">All Products</h2>
      <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-500 border-t border-[#ececec]">
              <th>SR No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Picture</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item: IProduct, index) => (
              <ProductRow
                key={item._id}
                srNo={index + 1}
                setOpenPop={setOpenPop}
                setUpdateTable={setUpdateTable}
                item={item}
              />
            ))}
          </tbody>
        </table>
      </div>

      {openPop && (
        <PopUp setOpenPop={setOpenPop} setUpdateTable={setUpdateTable} />
      )}
    </div>
  );
};

export default Dashboard;
