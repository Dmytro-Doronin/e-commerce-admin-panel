import {ResponseProductsForAdd} from './products.interface';

export interface Category {
  id: string,
  name: string,
  image: string
}

export interface ResponseCategory {
  categories: Category[]
}

export interface ResponseCategoryForAdd {
  addedCategory: {
    id: string,
    name: string,
    image: string
  }
}

export interface ResponseDeleteCategory {
  deleteCategory: boolean
}

export interface CreateCategoryDto {
  name: string,
  image: string,
}
