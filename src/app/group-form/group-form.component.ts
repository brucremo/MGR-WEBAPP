import { Component, OnInit } from '@angular/core';
import { Group } from '../group';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {
  title = 'group model';
  group: Group;
  constructor( private router: Router,
    private api: ApiService) { 
    this.group = new Group();
  }

  ngOnInit() {
  }

  GroupFormSubmit(f: NgForm): void {

    console.log("group name:" + this.group.GROUPNAME);
    console.log("group privacy: " + this.group.GROUPPRIVACY);
    console.log("group summary: " + this.group.GROUPSUMMARY);

    //group owner must be the person creating it
    this.group.GROUPOWNER = document.cookie.split("=")[1];

    //object for creating group
    var obj = {
      "GROUPNAME": this.group.GROUPNAME,
      "GROUPPRIVACY": this.group.GROUPPRIVACY,
      "GROUPSUMMARY": this.group.GROUPSUMMARY,
      "GROUPOWNER": this.group.GROUPOWNER
    };    
    console.log("obj: (before creation)" + obj.GROUPNAME + " | " + obj.GROUPOWNER + " | " + obj.GROUPPRIVACY + " | " + obj.GROUPSUMMARY);
    //use the API function to create the group
    this.api.createGroup(obj).subscribe(res =>{
      console.log(res);
    }, err =>{
      console.log("Error: " + err);
    });
    //this.router.navigate(['/user/', document.cookie.split("=")[1]]);

  }

}
