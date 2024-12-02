import {Component} from '@angular/core';

import {RouterOutlet} from '@angular/router';
import {AlertComponent} from './components/alert/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, AlertComponent],
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
