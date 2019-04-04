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
  public acceptedGroups = [];
  public pendingGroups = [];
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
      console.log(res.GROUPMEMBERS);
      this.userGroups = res;
      
      for(var i = 0; i < res.GROUPMEMBERS.length; i++){
        if(res.GROUPMEMBERS[i].STATUS == 0){
          this.pendingGroups.push(res.GROUPMEMBERS[i]);
        } 
        if(res.GROUPMEMBERS[i].STATUS == 1) {
          this.acceptedGroups.push(res.GROUPMEMEBERS[i]);
        }
      }
    }, err =>{
      console.log("Error:" + err);
    });
  }
  ngAfterContentInit(){
    this.reload();
  }
  reload(){
    this.ngOnInit();
  }
}
