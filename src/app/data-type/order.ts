export interface Order {
  id:number,
  name: string;
  email: string;
  phone: string;
  address: string;
  user_id: number;
  sub_total: number;
  tax: number;
  discount: number;
  delivery: number;
  total: number;
  created_at: string;
}

export interface OrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  name: string;
  slug: string;
  price: string;
  category: string;
  color: string;
  url: string;
  description: string;
  quantity: undefined | number;
  user_id: undefined | number;
  created_at: string;
}