import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavServiceService } from 'src/app/nav-service.service';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { User } from 'src/app/user';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  public library: any[] = [];
  public id: string = "";
  public user: User;
  public setFave: boolean = false;

  constructor(private nav: NavServiceService,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute) {
      this.user = new User();
  }

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
    this.route.params.subscribe(params => { this.id = stringify(params); })
    this.id = this.id.substring(3, this.id.length);
    this.user.USERID = this.id;

    // Get User Info for sidebar -HK
    this.api.getUser(this.user).subscribe(res => {
      this.user = res;
    }, err => {
      console.log(err);
    });  

    //get the user's collection
    this.api.getUserLibrary(this.id).subscribe(res => {
      console.log(res);
      this.library = res;

      for (var i = 0; i < this.library.length; i++){
        this.library[i].rating = Math.round((this.library[i].rating * 5) / 10) / 10;
      }

      console.log("Library after assigning: " + this.library);

    },
    err => {
      console.log("error in retrieving user library: " + err);
    });

    console.log("Exiting ngOnInit");
  }

  reloadPage() {
    var refresh = window.localStorage.getItem('refresh');
    console.log(refresh);
    if (refresh === null) {
      window.location.reload();
      window.localStorage.setItem('refresh', "1");
    }
  }

}