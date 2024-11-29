import {Component, computed, input, Signal} from '@angular/core';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatToolbarModule, MatButtonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  titleData = input<Signal<{ title: string; count: number | null }>>()

}
