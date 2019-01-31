import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { NavServiceService } from 'src/app/nav-service.service';
import { Review } from 'src/app/review';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videogame',
  templateUrl: './videogame.component.html',
  styleUrls: ['./videogame.component.css']
})
export class VideogameComponent implements OnInit {

  public game: any;
  public userid: String;
  public reviews = [];
  public rating = 0.0;
  public visible: boolean;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private nav: NavServiceService,
    private router: Router
  ) {
  }
  detail: any;

  ngOnInit() {
    console.log(document.cookie);
    this.userid = document.cookie.split('=')[1];
    console.log(this.userid);
    if (document.cookie) {
      this.nav.loggedInView();
      this.visible = true;
    }
    else {
      this.nav.loggedOutView();
      this.visible = false;
    }

    //Set the game object to the request response
    this.game = this.route.snapshot.data['videogame'];

    //Get the reviews for this game into the reviews array
    this.api.gameGetReviews(this.game.id).subscribe(res => {

      this.game.reviews = res;
      console.log(this.game.reviews);

      if (this.game.reviews.length != 0) {

        for (var i = 0; i < this.game.reviews.length; i++) {

          this.rating += this.game.reviews[i].REVIEWRATING;

          if (this.game.reviews[i].USERID == this.userid) {

            this.game.reviews[i].MINE = true;
          } else {

            this.game.reviews[i].MINE = false;
          }
        }

        this.rating = this.rating / this.game.reviews.length;
      } else {

        this.rating = (this.game.aggregated_rating * 5) / 100;
      }
    }, err => {

      console.log(err);
    });

  }

  onDelete(r: Review) {

    this.api.gameReviewDelete(r).subscribe(res => {

      this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }

  onAddToLibrary(gameid: Number) {
    //console.log("onAddToLibrary() function was triggered!")
    //need to get the userid and gameid
    //console.log("The game id is: " + this.game.id);
    //console.log("The userid is: " + this.userid);
    var gameID = String(gameid);
    this.api.addToUserLibrary(this.userid, gameID).subscribe(res => {
      console.log("Added to Collection!");
    }, err => {
      console.log("Error in adding game to collection: " + err);
    });
    //console.log("Exiting the onAddToLibrary() function");
  }

}
