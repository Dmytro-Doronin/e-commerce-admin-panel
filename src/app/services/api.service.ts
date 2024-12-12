import {inject, Injectable} from '@angular/core';
import {OperationVariables, TypedDocumentNode} from '@apollo/client';
import {Apollo} from 'apollo-angular';
import {AppLoadingService} from './app-loading.service';

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  private apollo = inject(Apollo)
  private appLoadingService = inject(AppLoadingService)

  fetchData<T, V extends OperationVariables>(
    query: TypedDocumentNode<T, V>,
    variables: V | null,
    onSuccess: (data: T) => void) {
    this.appLoadingService.show()
    this.apollo
      .watchQuery<T, V>({ query, variables: variables || ({} as V)  })
      .valueChanges.subscribe({
      next: (result) => {
        onSuccess(result.data)
        this.appLoadingService.hide()
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.appLoadingService.hide()
      },
    })
  }

  fetchMutation<T, V extends OperationVariables>(
    mutation: TypedDocumentNode<T, V>,
    variables: V,
    onSuccess: (data: T) => void
  ) {
    this.appLoadingService.show()
    this.apollo
      .mutate<T, V>({ mutation, variables })
      .subscribe({
        next: (result) => {
          if (result.data) {
            onSuccess(result.data)
          }
          this.appLoadingService.hide()
        },
        error: (err) => {
          this.appLoadingService.setAlert({message: err.message, severity: 'error'})
          this.appLoadingService.hide()
        },
      });
  }
}
