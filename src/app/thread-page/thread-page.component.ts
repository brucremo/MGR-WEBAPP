import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.css']
})
export class ThreadPageComponent implements OnInit {
  public allPosts = [];
  public threadInfo = [];
  public groupID: String;
  public threadID: String;
  constructor(private router: Router,
    private r: ActivatedRoute,
    private api: ApiService) {
  }

  //figure out if user is creator of post

  ngOnInit() {
       //get the group id from the URL
       var str = window.location.href;
       var pos = str.search('groups/');
       var _str = str.slice(pos + 7);
       this.groupID = _str.substring(0, _str.indexOf('/'));
       console.log(">Group ID extracted as: " + this.groupID);

       //get thread id from the URL
       var str = window.location.href;
       var pos = str.search('viewThread/');
       var _str = str.slice(pos + 11);
       this.threadID = _str;
       console.log(">Thread ID extracted as: " + this.threadID);
       
       //get all posts for the thread       
       var postRetriever = {
         "THREAD_ID": this.threadID,
         "GROUPID": this.groupID
       };
       this.api.getPost(postRetriever).subscribe(res=>{
        console.log(res);
        this.allPosts = res;
        console.log("Posts retrieved successfully!");
       }, err=>{
         console.log("Error: " + err);
       })

       //get entire thread info
       var threadRetriever = {
         "THREAD_ID": this.threadID,
         "GROUPID": this.groupID
       };
       this.api.getThread(threadRetriever).subscribe(res=>{
        console.log(res);
        this.threadInfo = res;
        console.log("Thread info retrieved successfully!");
        },err=>{
        console.log("Error: " + err);
       })
  }

  onDeleteThread() {
    console.log("Triggered onDeleteThread()");
    console.log("--- Beginning process of deleting this thread ---");
    //use the api function to delete the thread
    var obj = {
      "THREAD_ID": this.threadID,
      "GROUPID": this.groupID
    };
    this.api.deleteThread(obj).subscribe(res =>{
      console.log(res);
      console.log("--- End of deleting process ---");
    }, err =>{
      console.log("Error: " + err)
    })
    //redirect the user back to the group page
    this.router.navigate(['/groups/', this.groupID]);
  }

  onDeletePost(){
    console.log("Triggered onDeletePost()");
    console.log("--- Beginning process of deleting this post ---");
  }

  onCreatePost(){
    console.log("Triggered onCreatePost()");
    this.router.navigate(['/groups/' + this.groupID + '/createPost/' + this.threadID]);
  }
}
