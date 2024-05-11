import { Component } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { CoverComponent } from './cover/cover.component';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoverComponent,ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
