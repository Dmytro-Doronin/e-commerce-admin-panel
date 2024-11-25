import { Component } from '@angular/core';
import {AsideComponent} from '../components/aside/aside.component';
import {HeaderComponent} from '../components/header/header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    AsideComponent,
    HeaderComponent,
    RouterOutlet
  ],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
