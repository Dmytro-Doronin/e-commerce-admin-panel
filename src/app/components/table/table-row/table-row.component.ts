import {Component, input} from '@angular/core';
import {TableCellComponent} from '../table-cell/table-cell.component';
import {ImagesArrayComponentComponent} from '../../images-array-component/images-array-component.component';

@Component({
  selector: 'app-table-row',
  imports: [
    TableCellComponent,
    ImagesArrayComponentComponent,
  ],
  standalone: true,
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss'
})
export class TableRowComponent {
  rowData = input<{ [key: string]: any }>({})
  columns = input<string[]>([])

  getColumnValue(column: string): any {
      const data = this.rowData()
      if (!data) return '';

      const value = column.split('.').reduce((acc, key) => acc && acc[key], data);

      if (column === 'images' && Array.isArray(value)) {
        return value.map((image) => {
          try {
            return JSON.parse(image);
          } catch {
            return image;
          }
        })
      }

      return value || '';
  }
}
