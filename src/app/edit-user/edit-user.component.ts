import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public user: User;
  id: string = "";
  private sub: any;
  constructor(private router: Router,
    private r: ActivatedRoute,
    private m: ApiService,
    private nav: NavServiceService) {
    this.user = new User();
  }

  reloadPage() {
    var refresh = window.localStorage.getItem('refresh');
    console.log(refresh);
    if (refresh === null) {
      window.location.reload();
      window.localStorage.setItem('refresh', "1");
    }
  }

  ngOnInit() {
      //break down the cookie for user id
      this.r.params.subscribe(params => { this.id = stringify(params); });
      this.id = this.id.substring(3, this.id.length);
      console.log("starting ngOnInit()");
      console.log(this.id + " is the id from the params");
      console.log(document.cookie + " is the id from document.cookie");
      this.user.USERID = this.id;

      //check with cookie
      var verifier = document.cookie;
      var anotherVerifier = verifier.split("=")[1];
    if (anotherVerifier == this.user.USERID) {
      //change the view of the navbar
      this.nav.loggedInView();

      //get the user using the id
      this.m.getUser(this.user).subscribe(res => {
        this.user = res;
      }, err => {
        console.log(err);
        this.router.navigate(['/404']);
      });

    }
    else {
      this.nav.loggedOutView();

      this.router.navigate(['/404']);

    }
    console.log(this.user.USERID + " is the userid associated with this account");
  }

  onSubmit(editform: NgForm): void {

    this.m.useredit(this.user).subscribe(res => { }, err => {
      console.log(err);
    });

    this.router.navigate(['/user/' + this.id]);
  }

  onCancel() {
    this.router.navigate(['/user/' + this.id]);
  }


}
