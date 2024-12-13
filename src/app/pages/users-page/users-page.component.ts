import {Component, inject, OnInit, Signal} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {UsersInterface} from '../../interfaces/users.interface';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {ImagesArrayComponentComponent} from '../../components/images-array-component/images-array-component.component';
import {JsonPipe} from '@angular/common';
import {PageEvent} from '@angular/material/paginator';
import {MatButton} from '@angular/material/button';
import {AppLoadingService} from '../../services/app-loading.service';
import {of, pipe, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-users-page',
  imports: [
    MatTable,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatButton,
  ],
  standalone: true,
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent implements OnInit {
  usersService = inject(UsersService)
  appService = inject(AppLoadingService)
  users: Signal<UsersInterface[] | null> = this.usersService.getUsers
  countUser: Signal<number | null> = this.usersService.countUsers
  loading: Signal<boolean> = this.appService.appLoading
  usersTittles: Signal<string[]> = this.usersService.usersTableHeads

  limit = 10

  ngOnInit() {
    this.usersService.fetchUsers(this.limit)
    this.usersService.fetchAllUsers()
  }

  onLoadUsers() {
    this.limit = this.limit + 5
    this.usersService.fetchUsers(this.limit)
  }


}
