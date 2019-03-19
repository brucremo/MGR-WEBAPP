import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { User } from '../user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {
  public group: any;
  public userID: String;
  public isMember: boolean;
  public isAdmin: boolean;
  public isModerator: boolean;
  public isOwner: boolean;
  public askedToJoin: boolean;

  constructor(private router: Router,
    private r: ActivatedRoute,
    private api: ApiService) {
    this.group = {};
    this.userID = "";
    this.isMember = false;
    this.isAdmin = false;
    this.isModerator = false;
    this.isOwner = false;
    this.askedToJoin = false;
  }

  ngOnInit() {
    //get the group from the API
    //extract the group id from the url
    var url = window.location.href;
    var groupID = {
      "GROUPID": url.slice(url.lastIndexOf('/') + 1)
    };
    console.log("group ID: " + groupID.GROUPID);
    //pass it as a parameter to the relevant API function
    //subscribe to the response given by the API
    this.api.getGroup(groupID).subscribe(res => {
      console.log(res);
      this.group = res;

      //format the received object's date
      this.group[0].GROUPID = this.group[0].GROUPID.toUpperCase();
      this.group[0].GROUPCREATIONDATE = new Date(this.group[0].GROUPCREATIONDATE).toLocaleDateString("en-US");

      //check if user is a part of the group
      if (document.cookie) {
        this.userID = "brucremo";//document.cookie.split("=")[1];

        //compare userID with owner
        if (this.userID == this.group[0].GROUPOWNER) {
          this.isMember = true;
          this.isOwner = true;
        }

        //compare userID with admins
        for (var i = 0; i < this.group[0].GROUPADMINS.length; i++) {
          if (this.userID == this.group[0].GROUPADMINS[i].USERID) {
            this.isMember = true;
            this.isAdmin = true;
          }
        }

        //compare userID with moderators
        for (var i = 0; i < this.group[0].GROUPMODERATORS.length; i++) {
          if (this.userID == this.group[0].GROUPMODERATORS[i].USERID) {
            this.isMember = true;
            this.isModerator = true;
          }
        }

        //compare userID with other members
        for (var i = 0; i < this.group[0].GROUPMEMBERS.length; i++) {
          if (this.userID == this.group[0].GROUPMEMBERS[i].USERID)
            this.isMember = true;
        }
      }
    }, err => {
      console.log("error: " + err);
      this.router.navigate(['/404']);
    })
  }

  onJoinGroup() {
    this.askedToJoin = true;
  }

  onCancelJoinRequest(){
    this.askedToJoin=false;
  }
}
