
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
  image: string[];
  category: ICategory;
}
