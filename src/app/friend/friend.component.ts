import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  public sameUser: boolean;
  public user: User;
  id: string = "";
  public nav: NavServiceService;
  public friends: any[] = [];
  public pendingFriends: any[] = [];
  public acceptedFriends: any[] = [];
  public delFriend: string = "";

  constructor(private router: Router,
    private r: ActivatedRoute,
    private m: ApiService) {

    this.nav = new NavServiceService();
    this.user = new User();
    this.sameUser = false;

  }

  ngOnInit() {
    if (document.cookie) {
      this.nav.loggedInView();

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

    //object used for retrieving friends list
    var pendingFriendsRetriever = {
      "USER_ONE_ID": document.cookie.split("=")[1],
      "STATUS": 0
    };

    this.m.getFriends(pendingFriendsRetriever).subscribe(res => {
      this.pendingFriends = res;
      //ensuring that USER_ONE_ID is always associated with the cookie
      for (var i = 0; i < this.pendingFriends.length; i++) {
        if (this.pendingFriends[i].USER_ONE_ID != document.cookie.split("=")[1]) {
          //record current order of ID'S
          var theUserID = this.pendingFriends[i].USER_TWO_ID;
          var theFriendID = this.pendingFriends[i].USER_ONE_ID;

          //swap the values
          this.pendingFriends[i].USER_ONE_ID = theUserID;
          this.pendingFriends[i].USER_TWO_ID = theFriendID;
        }
      }
      console.log(this.friends);
    },
      err => {
        console.log("error in retrieving friends list: " + err);
      });

    var acceptedFriendsRetriever = {
      "USER_ONE_ID": document.cookie.split("=")[1],
      "STATUS": 1
    };

    this.m.getFriends(acceptedFriendsRetriever).subscribe(res => {
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
      console.log(this.friends);
    },
      err => {
        console.log("error in retrieving friends list: " + err);
      });

  }

  // Delete A User
  onRemoveFriend(friendId: string) {
    var friendDeleter = {
      "USER_ONE_ID": this.user.USERID,
      "USER_TWO_ID": friendId
    };

    var friendDeleter2 = {
      "USER_ONE_ID": friendId,
      "USER_TWO_ID": this.user.USERID
    };
    this.m.deleteFriend(friendDeleter).subscribe(res => {
      this.ngOnInit();
    }, err => {
      console.log("Error in deleting friend: " + err);
    });

    this.m.deleteFriend(friendDeleter2).subscribe(res => {
      this.ngOnInit();
    }, err => {
      console.log("Error in deleting friend: " + err);
    });
  }

  setDelete(friendId: string) {
    this.delFriend = friendId;
  }

  // Accept Request //
  onAccept(friendId: string){
    var friendAccept = {
      "USER_ONE_ID": friendId,
      "USER_TWO_ID": this.user.USERID,
      "STATUS":  1,
      "ACTION_USERID": this.user.USERID
    };

    var friendAccept2 = {
      "USER_ONE_ID": this.user.USERID,
      "USER_TWO_ID": friendId,
      "STATUS":  1
    };
    this.m.updateFriend(friendAccept).subscribe(res => {
<<<<<<< HEAD
      console.log(res);
=======
      this.ngOnInit();
>>>>>>> parent of a90d0c07... added action_userid attribute to onAccept() method
    }, err=>{
      console.log("Error in deleting friend: " + err);
    });

    this.m.updateFriend(friendAccept2).subscribe(res => {
      console.log(res);
    }, err=>{
      console.log("Error in deleting friend: " + err);
    });
  }

  refreshPage(){
    this.ngOnInit();
  }
}
