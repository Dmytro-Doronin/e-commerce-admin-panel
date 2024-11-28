import {ChangeDetectionStrategy, Component, inject, Signal, signal} from '@angular/core';

import {RouterOutlet} from '@angular/router';
import {ProductsService} from './services/product.service';
import {AppLoadingService} from './services/app-loading.service';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private appLoadingService = inject(AppLoadingService)
  loading: Signal<boolean> = this.appLoadingService.appLoading
}
