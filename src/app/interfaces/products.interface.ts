

interface ICategory {
  id: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: ICategory;
}

export interface ResponseProducts {
  products: Product[];
}
