import {inject, Injectable, signal} from '@angular/core';
import {AppLoadingService} from './app-loading.service';
import {ApiService} from './api.service';
import {GET_ALL_USERS, GET_USERS} from './graphQl-variables/users-variables.graphql';
import {ResponseUsersInterface, UsersInterface} from '../interfaces/users.interface';
import {allowedKeys, allowedKeysForUser} from '../mockData/keys';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  private appLoadingService = inject(AppLoadingService)
  private apiService = inject(ApiService)

  private usersSignal = signal<UsersInterface[]>([])
  private usersCountSignal = signal<number | null>(null)
  private usersTableHeadsSignal = signal<string[]>([])

  get getUsers() {
    return this.usersSignal
  }

  get countUsers() {
    return this.usersCountSignal
  }

  get usersTableHeads () {
    return this.usersTableHeadsSignal
  }

  fetchUsers(limit: number) {
    this.apiService.fetchData<ResponseUsersInterface, {limit: number}>(
      GET_USERS,
      {limit},
      (data) => {
        this.usersSignal.set(data.users)
        const allKeys = Object.keys(data.users[0]);
        const filteredKeys = allKeys.filter((key) => allowedKeysForUser.includes(key))
        this.usersTableHeadsSignal.set(filteredKeys)
      }
    )
  }


  fetchAllUsers() {
    this.apiService.fetchData<ResponseUsersInterface, {}>(
      GET_ALL_USERS,
      null,
      (data) => {
        this.usersCountSignal.set(data.users.length)
        this.appLoadingService.appTitle('Users', data.users.length)
      }
    )
  }
}
