import { useAppSelector } from "@/redux/hooks";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";
import CartProduct from "./CartProduct";

const Cart = ({ cartCount }: any) => {
  const products = useAppSelector((state) => state.cartReducer);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getTotal = () => {
    let total = 0;
    products.forEach((item) => (total = total + item.price * item.quantity));
    return total;
  };

  return (
    <>
      <Button className="flex bg-transparent" onPress={onOpen}>
        <div className="relative flex">
          <ShoppingCart size={30} />
          <div className="absolute -top-4 -right-4 w-[30px] h-[30px] rounded-full flex items-center justify-center bg-rose-500 text-white">
            {cartCount}
          </div>
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Your Cart
              </ModalHeader>
              <ModalBody>
                <div className=" mt-6 space-y-2">
                  {products?.map((item) => (
                    <CartProduct
                      key={item.id}
                      id={item.id}
                      img={item.img}
                      title={item.title}
                      quantity={item.quantity}
                      price={item.price}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between py-4">
                  <p>Total:</p>
                  <p>{getTotal()}</p>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Cart;
