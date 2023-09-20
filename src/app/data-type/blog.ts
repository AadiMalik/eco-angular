export interface Blog {
  id: number;
  title: string;
  category_id: number;
  category_name: any;
  url: string;
  description: string;
  slug: string;
}

export interface Search {
  search: string;
}
