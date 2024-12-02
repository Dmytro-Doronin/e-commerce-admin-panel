import {Component, inject, Signal} from '@angular/core';
import {AppLoadingService} from '../../services/app-loading.service';
import {IAlert} from '../../interfaces/app.interface';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [
    NgClass
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  appService = inject(AppLoadingService)
  alert: Signal<IAlert | null> = this.appService.alert

}
