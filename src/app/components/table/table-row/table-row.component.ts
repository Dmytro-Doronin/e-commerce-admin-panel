import {Component, input} from '@angular/core';
import {TableCellComponent} from '../table-cell/table-cell.component';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-table-row',
  imports: [
    TableCellComponent,
    NgFor,
    NgIf
  ],
  standalone: true,
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss'
})
export class TableRowComponent {
  // rowData = input<{ [key: string]: any }>({})
  columns = input<string[]>([])
}
