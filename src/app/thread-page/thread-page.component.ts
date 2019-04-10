import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.css']
})
export class ThreadPageComponent implements OnInit {
  public sameUser: boolean;
  public allPosts = [];
  public threadInfo = [];
  public groupID: String;
  public threadID: String;
  public userID: String;
  constructor(private router: Router,
    private r: ActivatedRoute,
    private api: ApiService) {
      this.sameUser = false;
  }

  //figure out if user is creator of post only allow them to delete post

  ngOnInit() {
       //get the group id from the URL
       this.userID = document.cookie.split("=")[1];
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

        //sort posts
        this.allPosts.sort((a,b) =>{
          var dateA = new Date(a.POSTCREATIONDATE), dateB = new Date(b.POSTCREATIONDATE);
          return dateB.getTime() - dateA.getTime();
        }
        );
       }, err=>{
         console.log("Error: " + err);
       })

       //get thread info
       var threadRetriever = {
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

  onDeletePost(post_id: String){
    console.log("--- Beginning process of deleting this post ---");
    console.log("POST_ID to be deleted is: " + post_id);
    console.log("THREAD_ID associated is: " + this.threadID);
    var postDelete = {
      "POST_ID": post_id,
      "THREAD_ID": this.threadID
    };
    this.api.deletePost(postDelete).subscribe(res=>{
      console.log(res);
      console.log("--- Post deleted successfully! ---");
    },err=>{
      console.log("error: " + err);
    })

    this.refresh();
  }

  onCreatePost(){
    console.log("Triggered onCreatePost()");
    this.router.navigate(['/groups/' + this.groupID + '/createPost/' + this.threadID]);
  }

  ngAfterViewInit(){
    this.refresh();
  }

  refresh(){
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }

      else
        localStorage.removeItem('firstLoad');
    }
  }
}
