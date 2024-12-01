import {computed, inject, Injectable, signal} from '@angular/core';
import {AppLoadingService} from './app-loading.service';
import {Apollo} from 'apollo-angular';

import {GET_CATEGORIES} from './graphQl-variables/categories-variables.graphql';
import {Category, ResponseCategory} from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})

export class CategoriesService {
  private appLoadingService = inject(AppLoadingService)
  private apollo = inject(Apollo)
  private categoriesNamesSignal = signal<string[]>([])

  get categoriesNames() {
    return this.categoriesNamesSignal
  }

  loadAllCategories() {
    this.appLoadingService.show()
    this.apollo
      .watchQuery<ResponseCategory>({ query: GET_CATEGORIES })
      .valueChanges.subscribe({
      next: (response) => {

        const categoryNames = this.extractCategories(response.data.categories)
        this.categoriesNamesSignal.set(categoryNames)

        this.appLoadingService.hide()
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.appLoadingService.hide()
      },
    })
  }

  private extractCategories(categories: Category[]): string[] {
    return ['All', ...Array.from(new Set(categories.map((category) => category.name)))]
    // const categoryNames = categories.map((category) => category.name)
    // const finalArray: string[] = Array.from(new Set(categoryNames))
    // finalArray.unshift('All')
    // return finalArray
  }


}
