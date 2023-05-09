export interface User {
  user_id: number,
  username: string,
  password: string,
  fullName: string,
  email: string,
}

export interface Product {
  product_id: number,
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
