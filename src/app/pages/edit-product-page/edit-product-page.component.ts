import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../interfaces/products.interface';

@Component({
  selector: 'app-edit-product-page',
  imports: [],
  standalone: true,
  templateUrl: './edit-product-page.component.html',
  styleUrl: './edit-product-page.component.scss'
})
export class EditProductPageComponent implements OnInit {

  route = inject(ActivatedRoute)
  productId: string = ''

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') ?? ''

  }

}
