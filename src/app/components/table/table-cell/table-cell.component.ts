import {Component, input} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-table-cell',
  imports: [NgFor, NgIf],
  standalone: true,
  templateUrl: './table-cell.component.html',
  styleUrl: './table-cell.component.scss'
})
export class TableCellComponent {
  value = input<string | number>()
}
