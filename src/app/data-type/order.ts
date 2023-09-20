export interface Order {
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