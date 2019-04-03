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
  constructor(private router: Router,
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

    //get the user's groups
    var retriever = {
      "USERID": this.user.USERID
    }
    this.api.getGroupsUser(this.user).subscribe(res =>{
      this.userGroups = res;

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
