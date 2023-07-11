interface RootProps {
  children: React.ReactNode,
  // session: any,
}

type Product = {
  _id: string,
  name: string,
  price: number,
  description: string,
  stock: number,
  image: string[],
  date: string,
}

type ProductInCart = {
  id: string,
  price: number,
  quantity: number,
}

type Cart = {
  products: {
    id: string,
    price: number,
    quantity: number,
  }[],
  cartCount: number,
  currentTotal: number,
}

type PillButtonProps = {
  label: string,
  handleClick: () => void,
  disable?: boolean,

};

type QuantityButtonProps = {
  handleClick: (add: boolean, product: Product) => void,
  product: Product,
  showQuantityButton: React.Dispatch<React.SetStateAction<any>>,
};

interface RootState {
  cartCount: number;
  currentTotal: number;
};

interface IncrementCartCountAction {
  type: "INCREMENT_CART_COUNT";
  payload: {
    id: string;
    price: number;
    quantity: number;
  };
}

interface DecrementCartCountAction {
  type: "DECREMENT_CART_COUNT";
  payload: {
    id: string;
    price: number;
    quantity: number;
  };
}

type CartActionTypes = IncrementCartCountAction | DecrementCartCountAction;
