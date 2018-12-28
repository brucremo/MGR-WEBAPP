import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { stringify } from 'querystring';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public user: User;
  id: string = "";
  urlParam: string = "";

  constructor(private router: Router,
    private r: ActivatedRoute,
    private m: ApiService,
    private nav: NavServiceService) {
    this.user = new User();

    //Parse the url parameters before sending the request
    this.r.params.subscribe(params => { this.urlParam = stringify(params); })
    this.user.USERID = this.urlParam.substring(3, this.urlParam.indexOf('&'));
    this.id = this.urlParam.substring((3 + this.user.USERID.length + 6), this.urlParam.length);

    //Send the request to check if the URL is valid with User object and URL GUID
    this.m.userCredentialCheck(this.user, this.id).subscribe(res => {
      this.user = JSON.parse(JSON.stringify(res));
    }, err => {
      console.log(err);
      this.router.navigate(['/404']);
    });
  }

  ngOnInit(): void {
    this.nav.loggedOutView();
  }

  onSubmit(f: NgForm): void {

    this.m.userPasswordChange(this.user).subscribe(res => {
      res as User
    })

    this.router.navigate(['/login']);
  }
}
