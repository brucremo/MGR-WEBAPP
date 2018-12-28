import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private m: ApiService,
    private nav: NavServiceService
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.nav.loggedOutView();
  }

  onSubmit(f: NgForm): void {

    console.log(JSON.stringify(this.user));
    this.m.userAdd(this.user).subscribe(res => {

      // Show the response from the web service
      console.log(res as string);

      let userId = res as string;
      userId = userId.replace('User ', '');
      userId = userId.replace(' added successfully', '');
      console.log(userId);
    });
    // Navigate to the user detail
    this.router.navigate(['/user/', this.user.USERID]);
  }
}
