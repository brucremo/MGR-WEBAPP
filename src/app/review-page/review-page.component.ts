import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/user';
import { Game } from 'src/app/game';
import { ApiService } from 'src/app/api.service';
import { IgdbService } from 'src/app/igdb.service';
import { Review } from 'src/app/review';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
import { Router } from '@angular/router';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {

  review: Review;
  game: Game;
  user: User;

  constructor(private m: ApiService,
  private g: IgdbService,
  private nav: NavServiceService,
  private router: Router) 
  {
    this.review = new Review();
    this.user = new User();
    this.game = new Game();
  }

  ngOnInit() {
    console.log(document.cookie);
    if(document.cookie){
      this.nav.loggedInView();
    }
    else{
      this.nav.loggedOutView();
    }

    //get the user information
    var userid = document.cookie;
    this.user.USERID = userid.substr(9, userid.length);
    this.review.USERID = this.user.USERID;

    this.m.getUser(this.user).subscribe(res => {

      this.user = res;
    }, err => {
      console.log(err);
    });

    //get the game information
    //store the game id (from the url) into a variable
    var gameID = window.location.href;
    var lastSlash = gameID.lastIndexOf("/") + 1;
    this.review.GAMEID = gameID.substr(lastSlash, gameID.length);

    //get the game content from the game id
    this.g.getGameInfo(this.review.GAMEID).subscribe(res=> {

      this.game = res;
    }), err=>{
      console.log(err);
    }
  }

  onSubmit(reviewForm: NgForm){ 

    console.log(this.review)

    this.m.gameReviewAdd(this.review).subscribe(res => {

      this.router.navigate(['/game/' + this.review.GAMEID]);
    }), err => {

      console.log(err);
    }

    this.router.navigate(['/game/' + this.review.GAMEID]);
  }

  onCancel(){
    this.router.navigate(['/game/' + this.review.GAMEID]);
    console.log("Should redirect back to game page!");
  }

}
