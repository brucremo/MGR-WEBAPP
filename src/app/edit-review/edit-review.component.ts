import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Review } from 'src/app/review';
import { ApiService } from 'src/app/api.service';
import { IgdbService } from 'src/app/igdb.service';
import { Router } from '@angular/router';
import { User } from 'src/app/user';
import { Game } from 'src/app/game';
import { NavServiceService } from 'src/app/nav-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {

  public review: Review;
  public game: Game;
  public user: User;

  public gameid: String;
  public userid: String;

  constructor(private m: ApiService,
    private g: IgdbService,
    private nav: NavServiceService,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router) {

    this.review = new Review();
    this.user = new User();
    this.game = new Game();
  }

  ngOnInit() {
    console.log(document.cookie)
    if (document.cookie) {
      this.nav.loggedInView();
    }
    else {
      this.nav.loggedOutView();
    }

    //store the game id (from the url) into a variable
    var gameID = window.location.href;
    var lastSlash = gameID.lastIndexOf("/") + 1;
    var gameID = gameID.substr(lastSlash, gameID.length);

    this.gameid = gameID;

    var ID = document.cookie;
    this.userid = ID.substr(9, ID.length);

    this.m.getUser(this.user).subscribe(res => {
      this.user = res;
    }, err => {
      console.log("Error in getting user info" + err);
    });

    //get the game content from the game id
    this.g.getGameInfo(this.gameid).subscribe(res => {
      this.game = res;
    }), err => {
      console.log("Error in getting game info: " + err);
    }

    this.m.getReview(this.gameid, this.userid).subscribe(res => {

      this.review = res[0];
      console.log(this.review);
    }), err => {

      console.log(err);
    }

  }

  onSubmit(reviewForm: NgForm) {

    this.m.gameReviewEdit(this.review).subscribe(res => {

      console.log("Success");
      this.router.navigate(['/game/' + this.gameid]);
    }), err => {

      console.log(err);
    }

    this.router.navigate(['/game/' + this.gameid]);
  }

  onCancel() {
    this.router.navigate(['/game/' + this.gameid]);
    console.log("Should redirect back to game page!");
  }

}
