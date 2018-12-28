import { Component, OnInit } from '@angular/core';
import { NavServiceService } from '../nav-service.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(public nav: NavServiceService) { }

  ngOnInit() {
    //selecting appropriate navbar
    if (document.cookie) {
      this.nav.loggedInView();
    } else {
      this.nav.loggedOutView();
    }
  }

}
