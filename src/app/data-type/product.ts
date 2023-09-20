export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  category: string;
  color: string;
  url: string;
  description: string;
  quantity: undefined | number;
  product_id: undefined | number;
}

export interface Cart {
  id: number;
  name: string;
  slug: string;
  price: string;
  category: string;
  color: string;
  url: string;
  description: string;
  quantity: undefined | number;
  product_id: undefined | number;
  user_id: undefined | number;
}

export interface Summary{
  sub_total:number,
  tax:number,
  delivery:number,
  discount:number,
  total:number

}
