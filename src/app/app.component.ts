import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'MyGamesReview';
}
