import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  public user: User;
  id: string = "";
  public nav: NavServiceService;
  public friends: any[] = [];
  public pendingFriends: any[] = [];
  public acceptedFriends: any[] = [];
  public delFriend: string ="";

  constructor(private router: Router,
    private r: ActivatedRoute,
    private m: ApiService) {

      this.nav = new NavServiceService();
      this.user = new User();

    }

  ngOnInit() {
    if(document.cookie){
      this.nav.loggedInView();
    }
    else{
      this.nav.loggedOutView();
    }

    // Get the user information
    var userid = document.cookie;
    this.user.USERID = userid.substr(9, userid.length);

    this.m.getUser(this.user).subscribe(res => {

      this.user = res;
    }, err => {
      console.log(err);
    });

    //object used for retrieving friends list
    var pendingFriendsRetriever = {
      "USER_ONE_ID": document.cookie.split("=")[1],
      "STATUS": 0
    };

    this.m.getFriends(pendingFriendsRetriever).subscribe(res =>{
      this.pendingFriends = res;
      console.log(this.friends);
    },
    err => {
      console.log("error in retrieving friends list: " + err);
    });

    var acceptedFriendsRetriever = {
      "USER_ONE_ID": document.cookie.split("=")[1],
      "STATUS": 1
    };

    this.m.getFriends(acceptedFriendsRetriever).subscribe(res =>{
      this.acceptedFriends = res;
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
    this.m.deleteFriend(friendDeleter).subscribe(res =>{
      this.ngOnInit();
    }, err =>{
      console.log("Error in deleting friend: " + err);
    });
    this.router.navigate(['/friends/' + this.user.USERID]);  
  }
  
  setDelete(friendId: string){
    this.delFriend = friendId;
  }

  

}
