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
  public delFriend: string ="";

  constructor(private router: Router,
    private r: ActivatedRoute,
    private m: ApiService) {

      this.nav = new NavServiceService();
      this.user = new User();
      this.sameUser=false;

    }

  ngOnInit() {
    if (document.cookie) {
      this.nav.loggedInView();

      this.r.params.subscribe(params => { this.id = stringify(params); })
      this.id = this.id.substring(3, this.id.length);
      this.user.USERID = this.id;

      console.log("docCookie: " + document.cookie.split("=")[1]);
      console.log(this.user.USERID);
      
      if(document.cookie.split("=")[1] == this.user.USERID){
        //user is on their own profile page
        this.sameUser=true;
      }
      else{
        //user is on someone else's profile page
        this.sameUser=false;
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
    var friendsRetriever = {
      "USER_ONE_ID": "brucremo",
      "STATUS": 0
    };

    this.m.getFriends(friendsRetriever).subscribe(res =>{
      this.friends = res;
      console.log(this.friends);
    },
    err => {
      console.log("error in retrieving friends list: " + err);
    });
  }

  //sort friends by STATUS

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
