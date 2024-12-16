import {computed, inject, Injectable, signal} from '@angular/core';
import {AppLoadingService} from './app-loading.service';

import {
  ADD_NEW_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_SINGLE_CATEGORY, UPDATE_CATEGORY
} from './graphQl-variables/categories-variables.graphql';
import {
  Category,
  CreateCategoryDto, ResponseCategories,
  ResponseCategory,
  ResponseCategoryForAdd,
  ResponseDeleteCategory, ResponseUpdateCategory, UpdateCategoryDto
} from '../interfaces/category.interface';
import {keysForCategories} from '../mockData/keys';
import {ApiService} from './api.service';
import {Router} from '@angular/router';
import {basePath} from '../app.routes';
import {ResponseDeleteProduct, ResponseUpdateProduct, UpdateProductDto} from '../interfaces/products.interface';
import {DELETE_PRODUCT, EDIT_PRODUCT} from './graphQl-variables/products-variables.graphql';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';


@Injectable({
  providedIn: 'root',
})

export class CategoriesService {
  private appLoadingService = inject(AppLoadingService)
  private apiService = inject(ApiService)
  private router = inject(Router)

  private categoriesSignal = signal<Category[]>([])
  private categorySignal = signal<Category | null>(null)

  private categoriesNamesSignal = signal<string[]>([])
  private categoriesTableHeadSignal = signal<string[]>([])


  get categories() {
    return this.categoriesSignal
  }

  get category() {
    return this.categorySignal
  }
  get categoriesTableHead() {
    return this.categoriesTableHeadSignal
  }

  get categoriesNames() {
    return this.categoriesNamesSignal
  }



  loadAllCategories(isHeader = false, limit: number = 10) {
    this.apiService.fetchData<ResponseCategories, never>(
      GET_CATEGORIES,
      null,
      (data) => {
        const limitedCategories = data.categories.slice(0, limit)
        this.categoriesSignal.set(limitedCategories)

        const allKeys = Object.keys(data.categories[0]);
        const filteredKeys = allKeys.filter((key) => keysForCategories.includes(key))
        this.categoriesTableHeadSignal.set(filteredKeys)

        const categoryNames = this.extractCategories(data.categories)
        this.categoriesNamesSignal.set(categoryNames)

        if (isHeader) {
          this.appLoadingService.appTitle('Categories', data.categories.length)
        }
      }
    )

  }

  addNewCategory(data: CreateCategoryDto) {
    this.apiService.fetchMutation<ResponseCategoryForAdd, { data: CreateCategoryDto }>(
      ADD_NEW_CATEGORY,
      { data },
      (data) => {
        this.appLoadingService.setAlert({message: 'Category has been added', severity: 'success'})
        this.router.navigate([`${basePath}/categories`])
      }
    )
  }

  loadCategory(id: number) {
    this.apiService.fetchData<ResponseCategory, { id: number }>(
      GET_SINGLE_CATEGORY,
      { id },
      (data) => {
        this.categorySignal.set(data.category)
        // this.appLoadingService.setAlert({message: 'Category has been added', severity: 'success'})
        // this.router.navigate([`${basePath}/categories`])
      }
    )
  }

  editCategory(id: number, data: UpdateCategoryDto) {
    this.apiService.fetchMutation<ResponseUpdateCategory, { id: number, changes: Partial<UpdateCategoryDto> }>(
      UPDATE_CATEGORY,
      { id, changes: data },
      (response) => {
        const updatedCategoryData = response.updateCategory
        const updatedCategories = this.categoriesSignal().map((category) =>
          +category.id === id
            ? {
              ...category,
              name: updatedCategoryData.name,
              image: updatedCategoryData.image,
            }
            : category
        )

        this.categoriesSignal.set(updatedCategories);

        this.router.navigate([`${basePath}/categories`])

        this.appLoadingService.setAlert({
          message: 'Category has been changed',
          severity: 'success',
        })
      }
    )
  }

  deleteCategory(id: number) {
    this.apiService.fetchMutation<ResponseDeleteCategory, { id: number }>(
      DELETE_CATEGORY,
      { id },
      (response) => {
        if (response.deleteCategory) {
          //remove from current category list
          const filteredCategories = this.categoriesSignal().filter(category => category.id !== String(id))
          this.categoriesSignal.set(filteredCategories)

          this.appLoadingService.setAlert({
            message: 'Category has been deleted',
            severity: 'success',
          });
        } else {
          this.appLoadingService.setAlert({
            message: 'Failed to delete the category.',
            severity: 'error',
          })
        }
      }
    )
  }


  private extractCategories(categories: Category[]): string[] {
    return ['All', ...Array.from(new Set(categories.map((category) => category.name)))]
  }


}
