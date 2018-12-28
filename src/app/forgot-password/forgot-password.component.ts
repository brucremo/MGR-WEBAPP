import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public user: User;
  constructor(private router: Router,
    private m: ApiService,
    private nav: NavServiceService) {
    this.user = new User();
  }

  ngOnInit() {
    this.nav.loggedOutView();
  }

  onSubmit(f: NgForm): void {

    this.m.userPasswordReset(this.user).subscribe(res => {
      res as User
    });
    this.router.navigate(['/sentEmail']);
  }

}
