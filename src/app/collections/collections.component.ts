import { Component, OnInit } from '@angular/core';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

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
