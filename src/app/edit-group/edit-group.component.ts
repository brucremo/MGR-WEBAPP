import { Component, OnInit } from '@angular/core';
import { Group } from '../group';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { NavServiceService } from '../nav-service.service';
import { NgForm } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  //used to show the 'add' or 'remove' button
  public activatedAddAdmin: boolean;
  public activatedRemoveAdmin: boolean;
  public activatedAddModerator: boolean;
  public activatedRemoveModerator: boolean;
  public activatedAddMember: boolean;
  public activatedRemoveMember: boolean;

  //used to show 'user not found' message
  public addAdmin_IDerror: boolean;
  public removeAdmin_IDerror: boolean;
  public addModerator_IDerror: boolean;
  public removeModerator_IDerror: boolean;
  public addMember_IDerror: boolean;
  public removeMember_IDerror: boolean;

  //used to categorize the user
  public isAdmin: boolean;
  public isModerator: boolean;

  //other utilities
  public receiver: any;
  public group: Group;
  public id: string = "";
  public users: User[];
  public requesters = [];
  public existingMembers = [];

  constructor(private router: Router,
    private r: ActivatedRoute,
    private m: ApiService,
    private nav: NavServiceService) {
    this.group = new Group();
    this.isAdmin = false;
    this.activatedAddAdmin = false;
    this.activatedRemoveAdmin= false;
    this.activatedAddModerator= false;
    this.activatedRemoveModerator= false;
    this.activatedAddMember= false;
    this.activatedRemoveMember= false;

    this.addAdmin_IDerror = false;
    this.removeAdmin_IDerror = false;
    this.addModerator_IDerror = false;
    this.removeModerator_IDerror = false;
    this.addMember_IDerror = false;
    this.removeAdmin_IDerror = false;
  }

  ngOnInit() {
    if (document.cookie.length <= 0) {
      this.router.navigate(['/404']);
    }

    //get the group using the id in the url
    var url = window.location.href;
    var obj = {
      "GROUPID": url.slice(url.lastIndexOf('/') + 1)
    };
    this.m.getGroup(obj).subscribe(res => {
      this.receiver = res;

      //copy the data into our group for binding
      this.group.GROUPID = this.receiver[0].GROUPID;
      this.group.GROUPNAME = this.receiver[0].GROUPNAME;
      this.group.GROUPOWNER = this.receiver[0].GROUPOWNER;
      this.group.GROUPPRIVACY = this.receiver[0].GROUPPRIVACY;
      this.group.GROUPSUMMARY = this.receiver[0].GROUPSUMMARY;

      //check to see if the user is admin or not
      //compare userID with admins
      for (var i = 0; i < this.receiver[0].GROUPADMINS.length; i++) {
        if (document.cookie.split("=")[1] == this.receiver[0].GROUPADMINS[i].USERID) {
          this.isAdmin = true;
        }
      }
      for (var i = 0; i < this.receiver[0].GROUPMODERATORS.length; i++) {
        if (document.cookie.split("=")[1] == this.receiver[0].GROUPMODERATORS[i].USERID) {
          this.isModerator = true;
        }
      }
      for(var i = 0; i < this.receiver[0].GROUPMEMBERS.length; i++){
        if(this.receiver[0].GROUPMEMBERS[i].STATUS == 0){
          this.requesters.push(this.receiver[0].GROUPMEMBERS[i])
        }
        else{
          this.existingMembers.push(this.receiver[0].GROUPMEMEBERS[i]);
        }
      }

    }, err => {
      console.log("Error: " + err);
    })

    this.m.getUsers().subscribe(res=>{
      this.users = res;
    }, err =>{
      console.log("error: " + err);
    })
  }

  onGroupSubmit(editgroup: NgForm) {
    var obj = {
      "GROUPID": this.group.GROUPID,
      "GROUPNAME": this.group.GROUPNAME,
      "GROUPOWNER": this.group.GROUPOWNER,
      "GROUPPRIVACY": this.group.GROUPPRIVACY,
      "GROUPSUMMARY": this.group.GROUPSUMMARY
    };
    console.log("The new id: " + this.group.GROUPID);


    this.m.updateGroup(obj).subscribe(res => {
      console.log(res);
      this.router.navigate(['/groups/', this.group.GROUPID]);
    }, err => {
      console.log(err);
    });

  }

  verifyUser(id: string){
    var found = false;
    for(var i = 0; i < this.users.length; i++){
      if(id == this.users[i].USERID){
        found = true;;
      }
    }
    return found;
  }

  onCancel() {
    this.router.navigate(['/groups/' + this.group.GROUPID]);
  }

  onEnterAddAdmin(value: string) { 
    this.id = value;
    console.log("value is: " + this.id);
    if(this.verifyUser(this.id)){
      this.addAdmin_IDerror = false;
      this.activatedAddAdmin = true;
    } else{
      this.addAdmin_IDerror = true;
      this.activatedAddAdmin = false;
    }
  }

  onEnterAddModerator(value: string) { 
    this.id = value;
    console.log("value is: " + this.id); 
    if(this.verifyUser(this.id)){
      this.addModerator_IDerror = false;
      this.activatedAddModerator = true;
    } else{
      this.addModerator_IDerror = true;
      this.activatedAddModerator = false;
    }
  }

  onEnterAddMember(value: string) { 
    this.id = value;
    console.log("value is: " + this.id); 
    if(this.verifyUser(this.id)){
      this.addMember_IDerror = false;
      this.activatedAddMember = true;
    } else{
      this.addMember_IDerror = true;
      this.activatedAddMember = false;
    }  
  }

  onEnterRemoveAdmin(value: string) { 
    this.id = value;
    console.log("value is: " + this.id); 
    if(this.verifyUser(this.id)){
      this.removeAdmin_IDerror = false;
      this.activatedRemoveAdmin = true;
    } else{
      this.removeAdmin_IDerror = true;
      this.activatedRemoveAdmin = false;
    }  
  }

  onEnterRemoveModerator(value: string) { 
    this.id = value;
    console.log("value is: " + this.id); 
    if(this.verifyUser(this.id)){
      this.removeModerator_IDerror = false;
      this.activatedRemoveModerator = true;
    } else{
      this.removeModerator_IDerror = true;
      this.activatedRemoveModerator = false;
    }  }

  onEnterRemoveMember(value: string) { 
    this.id = value;
    console.log("value is: " + this.id); 
    if(this.verifyUser(this.id)){
      this.removeMember_IDerror = false;
      this.activatedRemoveMember = true;
    } else{
      this.removeMember_IDerror = true;
      this.activatedRemoveMember = false;
    }
  }

  onAddMember(){
    console.log("triggerd onAddMember() function");
    console.log("Group ID is: " + this.group.GROUPID);
    console.log("Member to add: " + this.id);
    var obj = {
      "GROUPID": this.group.GROUPID,
      "USERID": this.id
    };
    //api call
    this.m.addMember(obj).subscribe(res=>{
      console.log(res);
    }, err =>{
      console.log("error: " + err);
      alert("Error: Unable to add member.");
    });

    //redirect user
    this.router.navigate(['/groups/', this.group.GROUPID]);
  }

  onRemoveMember(){
    console.log("triggered onRemoveMember() function");
    var obj = {
      "GROUPID": this.group.GROUPID,
      "USERID": this.id
    };
    //api call
    console.log("info acquired for delete:\n" +
      "groupID: " + this.group.GROUPID +
      "\nuserID: " + this.id
    );
    this.m.removeMember(obj).subscribe(res=>{
      console.log(res);
    }, err =>{
      console.log("error: " + err);
      alert("Error: Unable to remove member.");
    });

    //redirect user
    this.router.navigate(['/groups/', this.group.GROUPID]);

  }

  onAddModerator(){
    console.log("triggered onAddModerator() function");
    console.log(this.id);
    var obj = {
      "GROUPID": this.group.GROUPID,
      "USERID": this.id
    };
    //api call
    this.m.addModerator(obj).subscribe(res=>{
      console.log(res);
    }, err =>{
      console.log("error: " + err);
      alert("Error: Unable to remove moderator.");

    });

    //redirect user
    this.router.navigate(['/groups/', this.group.GROUPID]);

  }

  onRemoveModerator(){
    console.log("triggered onRemoveModerator() function");
    var obj = {
      "GROUPID": this.group.GROUPID,
      "USERID": this.id
    };
    //api call
    this.m.removeModerator(obj).subscribe(res=>{
      console.log(res);
    }, err =>{
      console.log("error: " + err);
      alert("Error: Unable to remove moderator.");

    });

    //redirect user
    this.router.navigate(['/groups/', this.group.GROUPID]);

  }

  onAddAdmin(){
    var obj = {
      "GROUPID": this.group.GROUPID,
      "USERID": this.id
    };
    //api call
    this.m.addAdmin(obj).subscribe(res=>{
      console.log(res);
    }, err =>{
      console.log("error: " + err);
      alert("Error: Unable to add Admin.");

    });

    //redirect user
    this.router.navigate(['/groups/', this.group.GROUPID]);
  }

  onRemoveAdmin(){
    var obj = {
      "GROUPID": this.group.GROUPID,
      "USERID": this.id
    };
    //api call
    this.m.removeAdmin(obj).subscribe(res=>{
      console.log(res);
    }, err =>{
      console.log("error: " + err);
      alert("Error: Unable to remove admin.");

    });

    //redirect user
    this.router.navigate(['/groups/', this.group.GROUPID]);
  }
}
