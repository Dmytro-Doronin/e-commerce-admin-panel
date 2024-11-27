import {Component, input} from '@angular/core';


@Component({
  selector: 'app-table-cell',
  imports: [],
  standalone: true,
  templateUrl: './table-cell.component.html',
  styleUrl: './table-cell.component.scss'
})
export class TableCellComponent {
  value = input<string | number>()
}
