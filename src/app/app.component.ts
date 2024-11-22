import { Component } from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {AsideComponent} from './components/aside/aside.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    HeaderComponent,
    AsideComponent
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-commerce-admin-panel';
}
