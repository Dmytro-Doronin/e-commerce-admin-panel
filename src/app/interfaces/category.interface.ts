import {ResponseProductsForAdd} from './products.interface';

export interface Category {
  id: string,
  name: string,
  image: string
}

export interface ResponseCategory {
  category: Category
}

export interface ResponseUpdateCategory {
  updateCategory: Category
}

export interface ResponseCategories {
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

export interface UpdateCategoryDto {
  name: string,
  image: string,
}
