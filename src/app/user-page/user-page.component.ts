import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  public acceptedFriends = [];
  public pendingfriends = [];
  public alreadyAdded: boolean;
  public pending: boolean;
  public sameUser: boolean;
  public user: User;
  id: string = "";
  public nav: NavServiceService;
  constructor(private router: Router,
    private r: ActivatedRoute,
    private m: ApiService) {
    this.sameUser = false;
    this.nav = new NavServiceService();
    this.user = new User();
    this.alreadyAdded = false;
    this.pending = false;
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
    if (document.cookie) {
      this.nav.loggedInView();

      //GETS THE ID FROM THE URL
      this.r.params.subscribe(params => { this.id = stringify(params); })
      this.id = this.id.substring(3, this.id.length);
      this.user.USERID = this.id;

      console.log("docCookie: " + document.cookie.split("=")[1]);
      console.log(this.user.USERID);

      if (document.cookie.split("=")[1] == this.user.USERID) {
        //user is on their own profile page
        this.sameUser = true;
      }
      else {
        //user is on someone else's profile page
        this.sameUser = false;

        //check for friends that have been added
        var friendRetriever = {
          "USER_ONE_ID": document.cookie.split("=")[1],
          "STATUS": 1
        };
        this.m.getFriends(friendRetriever).subscribe(res => {
          this.acceptedFriends = res;
          //ensuring that USER_ONE_ID is always associated with the cookie
          for (var i = 0; i < this.acceptedFriends.length; i++) {
            if (this.acceptedFriends[i].USER_ONE_ID != document.cookie.split("=")[1]) {
              //record current order of ID'S
              var theUserID = this.acceptedFriends[i].USER_TWO_ID;
              var theFriendID = this.acceptedFriends[i].USER_ONE_ID;

              //swap the values
              this.acceptedFriends[i].USER_ONE_ID = theUserID;
              this.acceptedFriends[i].USER_TWO_ID = theFriendID;
            }
          }

          for (var j = 0; j < this.acceptedFriends.length; j++){
            if(this.acceptedFriends[j].USER_TWO_ID == this.user.USERID){
              this.alreadyAdded = true;
              console.log("Already a friend!");
            }
          }
          console.log(this.acceptedFriends);
        },
          err => {
            console.log("error in retrieving friends list: " + err);
          });

        //Check for pending friendships
        var pfriendRetriever = {
          "USER_ONE_ID": document.cookie.split("=")[1],
          "STATUS": 0
        };
        this.m.getFriends(pfriendRetriever).subscribe(res => {
          this.pendingfriends = res;
          //ensuring that USER_ONE_ID is always associated with the cookie
          for (var i = 0; i < this.pendingfriends.length; i++) {
            if (this.pendingfriends[i].USER_ONE_ID != document.cookie.split("=")[1]) {
              //record current order of ID'S
              var theUserID = this.pendingfriends[i].USER_TWO_ID;
              var theFriendID = this.pendingfriends[i].USER_ONE_ID;
              //swap the values
              this.pendingfriends[i].USER_ONE_ID = theUserID;
              this.pendingfriends[i].USER_TWO_ID = theFriendID;
            }
          }
          for (var j = 0; j < this.pendingfriends.length; j++){
            if(this.pendingfriends[j].USER_TWO_ID == this.user.USERID){
              this.pending = true;
              console.log("Pending Friendship !");
            }
          }
          console.log(this.pendingfriends);
        },
          err => {
            console.log("error in retrieving friends list: " + err);
          });
      }

      this.m.getUser(this.user).subscribe(res => {
        this.user = res;
      }, err => {
        console.log(err);
        this.router.navigate(['/404']);
      });

    } else {
      this.r.params.subscribe(params => { this.id = stringify(params); })
      this.id = this.id.substring(3, this.id.length);
      this.user.USERID = this.id;

      this.m.getUser(this.user).subscribe(res => {
        this.user = res;
      }, err => {
        console.log(err);
        this.router.navigate(['/404']);
      });

      this.nav.loggedOutView();
    }

    console.log("the cookie with this account is: " + document.cookie);
  }

  onAddFriend(user_id: String) {
    if (document.cookie) {
      var friendToAdd = user_id;
      var relationshipObj = {
        USER_ONE_ID: document.cookie.split("=")[1],
        USER_TWO_ID: friendToAdd,
        ACTION_USERID: document.cookie.split("=")[1]
      };

      this.m.addFriend(relationshipObj).subscribe(res => {
        relationshipObj = res;
      }, err => {
        console.log("Error in onAddFriend(): " + err);
      });
    }
    else {
      alert("Please log in and try again");
      this.router.navigate(['/login']);
    }
    this.pending = true;
    this.reloadPage();
//    this.router.navigate(['/user/' + this.user.USERID]);
  }

  onViewFriends() {
    this.router.navigate(['/user/' + this.user.USERID + "/friends"]);
  }
}
