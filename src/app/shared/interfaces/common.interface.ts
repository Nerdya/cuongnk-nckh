export interface Product {
  id: number,
  name: string,
  image: string,
  price: number,
  category: string,
  description: string,
}

export interface CartItem {
  id: number,
  name: string,
  image: string,
  price: number,
  amount: number,
}
