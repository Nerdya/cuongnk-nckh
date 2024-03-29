export interface Table {
  id: string,
  schemaId: string,
  tableName: string,
  rows: any[],
}

export interface User {
  id?: string,
  username: string,
  password: string,
  fullName?: string,
  email?: string,
  phoneNumber?: string,
  role?: string,
}

export interface Product {
  id: number,
  name: string,
  image: string,
  price: number,
  category: string,
  description: string,
}

export interface Feedback {
  id?: string,
  email: string,
  content: string,
}

export interface CartItem {
  id: number,
  name: string,
  image: string,
  price: number,
  quantity: number,
}
