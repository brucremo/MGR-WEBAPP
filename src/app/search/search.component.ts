import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { IgdbService } from "../igdb.service";
import { NgForm } from '@angular/forms';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public game = new Game();
  public gamesQuery = [];

  constructor(
    private igdb: IgdbService,
    private nav: NavServiceService
  ) {
  }

  ngOnInit() {
    //selecting appropriate navbar
    if (document.cookie) {
      this.nav.loggedInView();
    }
    else {
      this.nav.loggedOutView();
    }
  }

  onSubmit(f: NgForm): void {

    this.igdb.getGamesByName(this.game.name).subscribe(res => {

      //Set the game object to the request response
      this.gamesQuery = res;

    }, err => {

      console.log(err);
    });
  }
}
