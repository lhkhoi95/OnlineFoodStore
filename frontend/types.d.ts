type Product = {
  _id: string,
  name: string,
  price: number,
  description: string,
  stock: number,
  image: string[],
  date: string,
}

type CartState = {
  items: number,
  total: number,
}