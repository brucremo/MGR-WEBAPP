import { Component, OnInit } from '@angular/core';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private nav: NavServiceService) { }

  ngOnInit() {
    //selecting appropriate navbar
    if (document.cookie) {
      this.nav.loggedInView();
    } else {
      this.nav.loggedOutView();
    }
  }

}
