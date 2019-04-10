import { Component, OnInit } from '@angular/core';
import { Group } from '../group'
import { Thread } from '../thread'
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { GroupedObservable } from 'rxjs';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit {
  group: any;
  thread: Thread;
  constructor(private router: Router, private api: ApiService) {
    this.thread = new Thread();
    this.group = {};
  }

  ngOnInit() {
    //get the group group id from the URL
    var str = window.location.href;
    var pos = str.search('groups/');
    var _str = str.slice(pos + 7);
    var groupID = _str.substring(0, _str.indexOf('/'));
    console.log(">Group ID extracted as: " + groupID);
    var obj = {
      "GROUPID": groupID
    };
    console.log(">Confirming group ID: " + obj.GROUPID);
    //call the api's get group info
    console.log("--- GETTING THE GROUP DATA ---");
    this.api.getGroup(obj).subscribe(res => {
      console.log(res);
      this.group = res;
    }, err => {
      console.log("Error: " + err);
    })
  }

  ThreadFormSubmit(f: NgForm): void {
    //created by the user that is legged in
    this.thread.CREATED_BY = document.cookie.split("=")[1];
    //group id extracted inside ngOnInit()
    this.thread.GROUPID = this.group[0].GROUPID;
    if (this.thread.THREAD_SUBJECT == undefined) {
      this.thread.THREAD_SUBJECT = "";
    }

    //for now setting all statuses to 1
    this.thread.STATUS = 1;

    console.log("--- Thread with following content to be created ---");
    console.log("thread_title: " + this.thread.THREAD_TITLE);
    console.log("thread_subject: " + this.thread.THREAD_SUBJECT);
    console.log("status: " + this.thread.STATUS);
    console.log("group_id: " + this.thread.GROUPID);
    console.log("created_by: " + this.thread.CREATED_BY);

    //creating the thread object
    var threadObj = {
      "THREAD_SUBJECT": this.thread.THREAD_SUBJECT, 
        "THREAD_TITLE" : this.thread.THREAD_TITLE, 
        "STATUS" : this.thread.STATUS, 
        "CREATED_BY" : this.thread.CREATED_BY, 
        "GROUPID" : this.thread.GROUPID
    }
    this.api.createThread(threadObj).subscribe(res =>{
      console.log(res);
      console.log("Thread Creation: Success!");
    }, err =>{
      console.log("Thread Creation: Fail");
      console.log("Error: " + err);
    })
    console.log("---navigating the user---")
    this.router.navigate(['/groups/', this.thread.GROUPID]);
    
  }
}
