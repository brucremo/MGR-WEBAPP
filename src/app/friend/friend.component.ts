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

    // Get User's Friends List
    this.m.getFriends(this.user.USERID).subscribe(res =>{
      this.friends = res;
    },
    err => {
      console.log("error in retrieving friends list: " + err);
    });
  }

    // Delete A User
  onRemoveFriend(friendId: string) {
    this.m.deleteFriend(friendId).subscribe(res =>{
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
