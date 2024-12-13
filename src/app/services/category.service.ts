import {computed, inject, Injectable, signal} from '@angular/core';
import {AppLoadingService} from './app-loading.service';
import {Apollo} from 'apollo-angular';

import {GET_CATEGORIES} from './graphQl-variables/categories-variables.graphql';
import {Category, ResponseCategory} from '../interfaces/category.interface';
import {ResponseUsersInterface} from '../interfaces/users.interface';
import {GET_USERS} from './graphQl-variables/users-variables.graphql';
import {allowedKeysForUser, keysForCategories} from '../mockData/keys';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})

export class CategoriesService {
  private appLoadingService = inject(AppLoadingService)
  private apiService = inject(ApiService)

  private categoriesSignal = signal<Category[]>([])
  private categoriesNamesSignal = signal<string[]>([])
  private categoriesTableHeadSignal = signal<string[]>([])

  get categories() {
    return this.categoriesSignal
  }
  get categoriesTableHead() {
    return this.categoriesTableHeadSignal
  }

  get categoriesNames() {
    return this.categoriesNamesSignal
  }



  loadAllCategories(isHeader = false, limit: number = 10) {
    this.apiService.fetchData<ResponseCategory, never>(
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

    // this.appLoadingService.show()
    // this.apollo
    //   .watchQuery<ResponseCategory>({ query: GET_CATEGORIES })
    //   .valueChanges.subscribe({
    //   next: (response) => {
    //
    //     const categoryNames = this.extractCategories(response.data.categories)
    //     this.categoriesNamesSignal.set(categoryNames)
    //
    //     this.appLoadingService.hide()
    //   },
    //   error: (err) => {
    //     console.error('Error fetching categories:', err);
    //     this.appLoadingService.hide()
    //   },
    // })
  }

  private extractCategories(categories: Category[]): string[] {
    return ['All', ...Array.from(new Set(categories.map((category) => category.name)))]
    // const categoryNames = categories.map((category) => category.name)
    // const finalArray: string[] = Array.from(new Set(categoryNames))
    // finalArray.unshift('All')
    // return finalArray
  }


}
