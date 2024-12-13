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
  ],
  standalone: true,
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent implements OnInit {

  usersService = inject(UsersService)

  users: Signal<UsersInterface[] | null> = this.usersService.getUsers
  usersTittles: Signal<string[]> = this.usersService.usersTableHeads

  ngOnInit() {
    this.usersService.fetchUsers()
  }
}
