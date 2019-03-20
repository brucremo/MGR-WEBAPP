import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { IgdbService } from "../igdb.service";
import { NgForm } from '@angular/forms';
import { NavServiceService } from 'src/app/nav-service.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public isGame: boolean;
  public isUser: boolean;
  public isGroup: boolean;

  public game = new Game();
  public gamesQuery = [];

  public user = new User();
  public userQuery = [];

  public query: string;
  public action: string;

  // public group = new Group();
  public groupQuery = [];

  constructor(
    private igdb: IgdbService,
    private nav: NavServiceService,
    private route: ActivatedRoute
  ) {
    this.isGame = false;
    this.isUser = false;
    this.isGroup = false;
    this.query = "";
    this.action = "";
  }

  ngOnInit() {
    //selecting appropriate navbar
    if (document.cookie) {
      this.nav.loggedInView();
    }
    else {
      this.nav.loggedOutView();
    }

    this.query = this.route.snapshot.params['query'];
    this.action = this.route.snapshot.params['action'];

    if (this.action == "games"){
      this.isGame = true;

      this.igdb.getGamesByName(this.query).subscribe(res => {

        //Set the game object to the request response
        this.gamesQuery = res;
  
      }, err => {
  
        console.log(err);
      });
    }
    else if (this.action == "users")
      this.isUser = true;
    else if (this.action == "groups")
      this.isGroup = true;      
  }

  onSubmit(f: NgForm): void {
    this.isGame = true;
    this.igdb.getGamesByName(this.game.name).subscribe(res => {

      //Set the game object to the request response
      this.gamesQuery = res;

    }, err => {

      console.log(err);
    });
  }
}
