import { Component, OnInit } from '@angular/core';
import { NavServiceService } from '../nav-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  private action: string;
  private id: string;
  public query: string;

  constructor(public nav: NavServiceService,
  private router: Router) { 
    this.id = "";
    this.action = "Games"
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

  setAction(act: string){
    this.action = act;
  }

  getAction (){
    return this.action;
  }

  onSubmit(f: NgForm): void {
    if (this.action == "Games"){
      this.router.navigate(['/search/' + 'games/' + this.query]);
    } else if (this.action == "Users"){
      this.router.navigate(['/search/' + 'users/' + this.query]);
    } else if (this.action == "Groups"){
      this.router.navigate(['/search/' + 'groups/' + this.query]);
    };
  }
  
}
