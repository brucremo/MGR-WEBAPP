import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { NavServiceService } from 'src/app/nav-service.service';
import { Review } from 'src/app/review';
import { Router } from '@angular/router';
import { Game } from '../game';
import { User } from '../user';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {

  public user: User;
  public reviews = [];
  public visible: boolean;
  public nav: NavServiceService;

  constructor(
    private route: ActivatedRoute,
    private m: ApiService,
    private router: Router
  ) {
    this.user = new User();
  }

  detail: any;

  ngOnInit() {
    console.log(document.cookie);
    if (document.cookie) {
      this.nav.loggedInView();
      this.visible = true;
    }
    else {
      this.nav.loggedOutView();
      this.visible = false;
    }

    var ID = document.cookie;
    this.user.USERID = ID.substr(9, ID.length);

    this.m.getUser(this.user).subscribe(res => {
      this.user = res;

      console.log(res);
    }, err => {
      console.log(err);
    });

    this.m.userGetReviews(this.user.USERID).subscribe(res => {

      this.reviews = res;
    }), err => {

      console.log(err);
    }
  }

  onDelete(r: Review) {

    this.m.gameReviewDelete(r).subscribe(res => {
      this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }
}
