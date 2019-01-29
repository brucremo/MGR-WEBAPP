import { Component, OnInit } from '@angular/core';
import { NavServiceService } from 'src/app/nav-service.service';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  public library = [];

  constructor(private nav: NavServiceService,
  private api: ApiService,
  private router: Router) { }

  ngOnInit() { 
    console.log("Inside ngOnInit");   
    //selecting appropriate navbar
    if (document.cookie) {
      this.nav.loggedInView();

      //create a variable that stores the user's id
      var userId = document.cookie.split('=')[1];
      console.log(userId);
      //get the user's collection
      this.api.getUserLibrary(userId).subscribe(res=>{
        this.library = res;
      }, err=>{
        console.log("error in retrieving user library: " + err);
      })

      console.log(this.library[0]);

    } else {
      //means the user did not successfully log in
      this.nav.loggedOutView();

      //for now, redirect the user to the 404 page
      this.router.navigate(['/404']);

    }

    console.log("Exiting ngOnInit");
  }

}
