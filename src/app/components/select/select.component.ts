import {Component, input, OnInit, output, Signal, ViewEncapsulation} from '@angular/core';
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
export class SelectComponent implements OnInit {
  categories = input<Signal<string[]>>()
  categoryId = input<Signal<number | null>>()
  changed = output<{categoryId: number}>({alias: 'categoryIdChange'})
  localCategoryI: number | null = 0



  ngOnInit() {
    const categoryIdSignal = this.categoryId()
    if (categoryIdSignal) {
      this.localCategoryI = categoryIdSignal()
    }
   console.log(this.localCategoryI);
  }

  setCategoryId(event: MatSelectChange) {
    this.changed.emit({categoryId: event.value});
    console.log(event.value)
  }
}
