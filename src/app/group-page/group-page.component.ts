import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {
  public group: any;
  public groupname: String;
  public userID: String;
  public isMember: boolean;
  public isAdmin: boolean;
  public isModerator: boolean;
  public isOwner: boolean;
  public askedToJoin: boolean;
  public nonMember: boolean;

  constructor(private router: Router,
    private r: ActivatedRoute,
    private api: ApiService) {
    this.group = {};
    this.userID = "";
    this.nonMember = true;
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
    this.groupname = url.slice(url.lastIndexOf('/') + 1);
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
      this.group[0].GROUPCREATIONDATE = new Date(this.group[0].GROUPCREATIONDATE).toLocaleDateString("en-US");

      //check if user is a part of the group
      if (document.cookie) {
        this.userID = document.cookie.split("=")[1];

        //compare userID with owner
        if (this.userID == this.group[0].GROUPOWNER) {
          this.isOwner = true;
          this.nonMember = false;
        }

        //compare userID with admins
        for (var i = 0; i < this.group[0].GROUPADMINS.length; i++) {
          if (this.userID == this.group[0].GROUPADMINS[i].USERID) {
            this.isAdmin = true;
            this.nonMember = false;
          }
        }

        //compare userID with moderators
        for (var i = 0; i < this.group[0].GROUPMODERATORS.length; i++) {
          if (this.userID == this.group[0].GROUPMODERATORS[i].USERID) {
            this.isModerator = true;
            this.nonMember = false;
          }
        }

        //compare userID with other members
        for (var i = 0; i < this.group[0].GROUPMEMBERS.length; i++) {
          if (this.userID == this.group[0].GROUPMEMBERS[i].USERID)
            this.isMember = true;
            this.nonMember = false;
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
  
  onEditGroup(){
    console.log("triggered OnEditGroup()");
    this.router.navigate(['/editGroup/', this.groupname]);
  }

  onDeleteGroup(){
    console.log("triggered OnDeleteGroup()");
    var url = window.location.href;
    var obj = {
      "GROUPID": url.slice(url.lastIndexOf('/') + 1)
    };
    console.log("deleting group with the ID: " + obj.GROUPID);
    this.api.deleteGroup(obj).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/userGroups']);

    }, err=>{
      console.log("error: " + err);
    });

  }

  onLeaveGroup(){
    var url = window.location.href;
    var obj = {
      "GROUPID": url.slice(url.lastIndexOf('/') + 1),
      "USERID": document.cookie.split("=")[1]
    };
    if(this.isAdmin){
      this.api.removeAdmin(obj).subscribe(res=>{
        this.isAdmin = false;
        this.ngOnInit();
      }, err=>{
        console.log("error: " + err);
      })
    }
    if(this.isMember){
      this.api.removeMember(obj).subscribe(res =>{
        this.isMember = false;
        this.ngOnInit();
      }, err=>{
      console.log('err: ' + err);
      })
    }
    if(this.isModerator){
      this.api.removeModerator(obj).subscribe(res=>{
        this.isModerator = false;
        this.ngOnInit();
      }, err =>{
        console.log("err: " + err);
      })
    }
  }

}
