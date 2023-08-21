interface ComponentProps {
  children: React.ReactNode,
  // session: any,
}

type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  address: string;
  accessToken: string;
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
  productId: string,
  price: number,
  quantity: number,
}

type Cart = {
  products: ProductInCart[],
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
