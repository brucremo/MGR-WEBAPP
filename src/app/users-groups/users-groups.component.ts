import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { NavServiceService } from '../nav-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Group } from '../group';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit {

  public user: User;
  public groups: Group[];
  public userGroups: any;
  public nav: NavServiceService;
  public acceptedGroups = [""];
  public pendingGroups = [""];
  constructor(private router  : Router,
    private r: ActivatedRoute,
    private api: ApiService) {
    this.nav = new NavServiceService();
    this.user = new User();
  }
  ngOnInit() {
    if(document.cookie){
      //the user is logged in, get the user associated with the cookie
      this.user.USERID = document.cookie.split("=")[1];
      this.api.getUser(this.user).subscribe(res => {
        this.user = res;
      }, err => {
        console.log(err);
        this.router.navigate(['/404']);
      });
    } else {
      //user is not logged in
      this.router.navigate(['/404']);
    }

    var obj ={
      "USERID": this.user.USERID
    }

    console.log("obj being sent has following properties: ");
    console.log("USERID: " + obj.USERID);
    this.api.getGroupsUser(obj).subscribe(res =>{
      console.log("Triggered getGroupsUser()");
      console.log(res);
      this.userGroups = res;
      
      //get all of user's pending groups into pendingGroups array
      for(var i = 0; i < res.GROUPMEMBERS.length; i++){
        if(res.GROUPMEMBERS[i].STATUS == 0){
          console.log("adding to pending groups: " + res.GROUPMEMBERS[i].GROUPNAME);
          this.pendingGroups[i] = res.GROUPMEMBERS[i];
        } 
      }

      //get all of user's accepted groups into acceptedGroups array
      for(var i = 0; i < res.GROUPMEMBERS.length; i++){
        //check for null -> user was adding without requesting to be added
        if(res.GROUPMEMBERS[i].STATUS == 1 || res.GROUPMEMBERS[i].STATUS == null) {
          console.log("adding to accepted groups: " + res.GROUPMEMBERS[i].GROUPNAME);
          this.acceptedGroups[i] = res.GROUPMEMBERS[i];
        }
      }

      //splicing added to avoid strange outputs

      //removes any undefined elements in acceptedGroups array
      for(var i = 0; i < this.acceptedGroups.length; i++){
        if(this.acceptedGroups[i] == undefined){
          this.acceptedGroups.splice(i, 1);
        }
      }

      //removes any undefined elements in pendingGroups array
      for(var i = 0; i < this.pendingGroups.length; i++){
        if(this.pendingGroups[i] == undefined){
          this.pendingGroups.splice(i, 1);
        }
      }
    }, err =>{
      console.log("Error:" + err);
    });
  }

}
