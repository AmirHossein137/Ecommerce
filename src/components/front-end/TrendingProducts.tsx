import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../modules/SearchIcon";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLoading } from "@/redux/features/loadingReducer";
import Loader from "../admin-panel/Loader";

interface IProduct {
  _id: string;
  imgSrc: string;
  fileKey: string;
  name: string;
  price: number;
  category: string;
}

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState<string>("");
  const isLoading = useAppSelector((state) => state.loadingReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get("/api/get_products")
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  console.log(products);

  return (
    <>
      <div className="container mx-auto px-4 mt-32">
        <div className="sm:flex justify-between items-center">
          <h2>Trending Products</h2>
          <div className="text-gray-500 flex gap-4 text-xl mt-4 sm:mt-0">
            <div className="text-black">New</div>
            <div>Featured</div>
            <div>Top Sellers</div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center my-5">
          <div className="flex items-center justify-center w-[650px] max-w-full rounded-2xl shadow-md">
            <Input
              label="Search"
              isClearable
              radius="lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to search..."
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl-grid-cols-4 mt-8">
          {products
            .filter((item: IProduct) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search);
            })
            .map((item: IProduct) => (
              <ProductCard
                key={item._id}
                id={item._id}
                img={item.imgSrc}
                category={item.category}
                title={item.name}
                price={item.price}
              />
            ))}
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default TrendingProducts;
