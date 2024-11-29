import {Component, inject, Signal} from '@angular/core';
import {AsideComponent} from '../components/aside/aside.component';
import {HeaderComponent} from '../components/header/header.component';
import {RouterOutlet} from '@angular/router';
import {AppLoadingService} from '../services/app-loading.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-layout',
  imports: [
    AsideComponent,
    HeaderComponent,
    RouterOutlet,
    MatProgressBarModule
  ],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  appLoadingService = inject(AppLoadingService)
  loading: Signal<boolean> = this.appLoadingService.appLoading
  titleData: Signal<{title: string; count: number | null}> = this.appLoadingService.titleData
}
