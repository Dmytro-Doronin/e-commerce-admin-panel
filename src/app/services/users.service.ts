import {inject, Injectable, signal} from '@angular/core';
import {AppLoadingService} from './app-loading.service';
import {ApiService} from './api.service';
import {GET_USERS} from './graphQl-variables/users-variables.graphql';
import {ResponseUsersInterface, UsersInterface} from '../interfaces/users.interface';
import {allowedKeys, allowedKeysForUser} from '../mockData/keys';

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  private appLoadingService = inject(AppLoadingService)
  private apiService = inject(ApiService)

  private usersSignal = signal<UsersInterface[]>([])
  private usersTableHeadsSignal = signal<string[]>([])

  get getUsers() {
    return this.usersSignal
  }

  get usersTableHeads () {
    return this.usersTableHeadsSignal
  }

  fetchUsers() {
    this.apiService.fetchData<ResponseUsersInterface, never>(
      GET_USERS,
      null,
      (data) => {
        this.usersSignal.set(data.users)
        const allKeys = Object.keys(data.users[0]);
        const filteredKeys = allKeys.filter((key) => allowedKeysForUser.includes(key))
        this.usersTableHeadsSignal.set(filteredKeys)
        this.appLoadingService.appTitle('Users', data.users.length)
      }
    )
  }

}
