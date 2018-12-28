import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;

  constructor(private router: Router,
    private m: ApiService,
    private nav: NavServiceService) {
    this.user = new User();
  }

  ngOnInit(): void {
    console.log("inside ngOnInit()");
    this.nav.loggedOutView();
  }

  onSubmit(f: NgForm): void {
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "username="+this.user.USERID+"; expires="+d+"; path=/";

    //Send User and password for comparison
    this.m.userLogin(this.user).subscribe(res => {
      res as User

      if (res.USERPASSWORD == 'true') {

        this.router.navigate(['/user/' + res.USERID]);
      } else {
        document.getElementById("error").innerHTML = 'The username/password entered does not exist in our database.<br>Please try again.';
      }
    });
  }

}
