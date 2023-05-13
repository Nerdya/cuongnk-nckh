export interface Table {
  id: string,
  schemaId: string,
  tableName: string,
  rows: User[],
}

export interface User {
  id?: string,
  username: string,
  password: string,
  fullName: string,
  email: string,
  phoneNumber: string,
  role?: string,
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
