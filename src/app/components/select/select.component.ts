import {Component, input, output, Signal, ViewEncapsulation} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-select',
  imports: [
    MatFormField,
    MatOption,
    MatSelect,
    MatLabel,
  ],
  standalone: true,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent {
  categories = input<Signal<string[]>>()
  changed = output<{categoryId: number}>({alias: 'categoryIdChange'})

  setCategoryId(event: MatSelectChange) {
    this.changed.emit({categoryId: event.value});
    console.log(event.value)
  }
}
