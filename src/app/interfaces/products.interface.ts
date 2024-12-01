

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

export interface ResponseProductsForAdd {
  addProduct: {
    title: string;
    price: number;
    description: string;
    images: string[];
    category: {
      id: number;
      name: string;
      image: string;
    }
  }
}
export interface CreateProductInput {
  title: string;
  price: number;
  categoryId: number;
  description: string;
  images: string[];
}
