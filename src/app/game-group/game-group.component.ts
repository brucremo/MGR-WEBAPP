import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-game-group',
  templateUrl: './game-group.component.html',
  styleUrls: ['./game-group.component.css']
})
export class GameGroupComponent implements OnInit {
  public group: any;
  public userID: String;
  public game: any;
  public visible: boolean;

  constructor(private router: Router,
    private r: ActivatedRoute,
    private api: ApiService,
    private nav: NavServiceService) {
      this.group = {};
      this.userID = "";
     }

  ngOnInit() {
    console.log(document.cookie);
    this.userID = document.cookie.split('=')[1];
    console.log(this.userID);
    if (document.cookie) {
      this.nav.loggedInView();
      this.visible = true;
    }
    else {
      this.nav.loggedOutView();
      this.visible = false;
    }

    //Set the game object to the request response
    this.game = this.r.snapshot.data['videogame'];
    //get the group from the API
    //extract the group id from the url
    var url = window.location.href;
    var groupID = {
      "GROUPID": url.slice(url.lastIndexOf('/') + 1)
    };

    
  }

  getScreen(){
    return `url("${this.game.screenshots[0].url}")`
  }

}
