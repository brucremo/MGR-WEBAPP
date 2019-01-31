import { Component, OnInit } from '@angular/core';
import { NavServiceService } from 'src/app/nav-service.service';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { User } from 'src/app/user';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  constructor(private nav: NavServiceService,
    private api: ApiService,
    private router: Router) {
  }
  public library: any[] = [];

  ngOnInit() {
    console.log("Inside ngOnInit");
    //selecting appropriate navbar
    if (document.cookie) {
      this.nav.loggedInView();
    } else {
      this.nav.loggedOutView();
      //for now, redirect the user to the 404 page
      this.router.navigate(['/404']);
    }
    //create a variable that stores the user's id
    var userId = document.cookie.split('=')[1];
    userId = userId.split(';')[0];
    //get the user's collection
    this.api.getUserLibrary(userId).subscribe(res => {
      console.log(res);
      this.library = res;
      console.log("Library after assigning: " + this.library);
    },
    err => {
      console.log("error in retrieving user library: " + err);
    });

    console.log("Exiting ngOnInit");
  }


}