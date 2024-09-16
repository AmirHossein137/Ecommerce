import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../app/logo.svg";
import Cart from "./Cart";
import { signOut, useSession } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { CircleUserRound } from "lucide-react";

const NavBar = () => {
  const cartCount = useAppSelector((state) => state.cartReducer.length);

  const { data: session } = useSession();

  return (
    <div className="py-4 bg-white top-0 sticky shadow-sm">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <Image src={Logo} width={200} height={60} alt="logo" />
          </Link>
          <div className="flex items-center gap-5">
            {!session?.user ? (
              <Link href={'/signin'} className="border border-gray-200 p-2 rounded-md">
                SignIn
              </Link>
            ) : (
              <div>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">
                      <CircleUserRound />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="dash">
                      <Link href={"/admin/dashboard"}>Dashboard</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <button onClick={() => signOut()}>SignOut</button>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            )}
            <Cart cartCount={cartCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
