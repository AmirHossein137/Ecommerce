import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../app/logo.svg";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Search, ShoppingCart } from "lucide-react";
import Cart from "./Cart";


const NavBar = () => {
  const cartCount = useAppSelector((state) => state.cartReducer.length);

  return (
    <div className="py-4 bg-white top-0 sticky shadow-sm">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <Image src={Logo} width={200} height={60} alt="logo" />
          </Link>
          <div className="lg:flex items-center hidden w-full border overflow-hidden border-blue-400 rounded-2xl max-w-[500px]">
            <Input
              type="search"
              label=""
              labelPlacement="outside"
              placeholder="Search For Products..."
            />
            <Button className="rounded-tl-none rounded-bl-none" color="primary">
              <Search />
            </Button>
          </div>
          <div>
            <Cart cartCount={cartCount}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
