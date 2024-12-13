import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListItem, MatNavList} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {basePath} from '../../app.routes';
import {adminLinks, userLinks} from '../../mockData/pages';

@Component({
  selector: 'app-aside',
  imports: [MatSidenavModule, MatIconModule, MatNavList, MatListItem, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {

  protected readonly basePath = basePath;
  protected readonly userLinks = userLinks;
  protected readonly adminLinks = adminLinks;
}
