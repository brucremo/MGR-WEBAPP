import { Component, OnInit } from '@angular/core';
import { NavServiceService } from '../nav-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  
  private id: string;

  constructor(public nav: NavServiceService,
  private router: Router,
  private r: ActivatedRoute) { 
    this.id = "";
  }

  ngOnInit() {
    this.nav.show();

    console.log("Inside ngOnInit! userid: " + document.cookie);
    if (document.cookie) {
      //break down the cookie for user id
      this.id = document.cookie.split("=")[1];
      this.nav.loggedInView();
    }
    else{
      this.nav.loggedOutView();
    }

  }

  navigateToProfile(){
    this.router.navigate(['/user/' + this.id]);
  }
  
}
