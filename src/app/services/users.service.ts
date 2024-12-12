import {inject, Injectable, signal} from '@angular/core';
import {AppLoadingService} from './app-loading.service';
import {Apollo} from 'apollo-angular';
import {ApiService} from './api.service';
import {GET_USERS} from './graphQl-variables/users-variables.graphql';

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  private appLoadingService = inject(AppLoadingService)
  private apiService = inject(ApiService)

  private users = signal<UsersInterface[] | null>(null)

  get getUsers() {
    return this.users
  }

  fetchUsers() {
    this.apiService.fetchData<ResponseUsersInterface, never>(
      GET_USERS,
      null,
      (data) => {
        this.users.set(data.users)
      }
    )
  }

}
