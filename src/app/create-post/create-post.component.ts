import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  public groupID: String;
  public threadID: String;
  post: Post;
  constructor(private router: Router, private api: ApiService) {
    this.post = new Post();
  }

  ngOnInit() {
    //extract the thread id from the url
    var url = window.location.href;
    this.threadID = url.slice(url.search('createPost/') + 11);
    console.log("ThreadID is: " + this.threadID);

    //extract the group id fromthe url
    var str = window.location.href;
    var pos = str.search('groups/');
    var _str = str.slice(pos + 7);
    var groupID = _str.substring(0, _str.indexOf('/'));
    console.log("Group ID extracted as: " + groupID);
  }

  PostFormSubmit(f: NgForm): void {
    //the creator of the post is the user that's logged in
    this.post.CREATED_BY = document.cookie.split("=")[1];

    //all posts set to status of 1 for now
    this.post.STATUS = 1;
    this.post.THREAD_ID = this.threadID;

    console.log("--- Post with following content to be created ---");
    console.log("post creator: " + this.post.CREATED_BY);
    console.log("post content: " + this.post.POST_CONTENT);
    console.log("post status: " + this.post.STATUS);
    console.log("post for the thread: " + this.post.THREAD_ID);

    var postObj = {
      POST_CONTENT: this.post.POST_CONTENT,
      STATUS: this.post.STATUS,
      CREATED_BY: this.post.CREATED_BY,
      THREAD_ID: this.post.THREAD_ID,
    };

    this.api.createPost(postObj).subscribe(res =>{
      console.log(res);
      console.log("Post created successfully!");
    }, err=>{
      console.log("Error: " + err);
    });

    this.router.navigate(['/groups/' + this.groupID + '/viewThread/' + this.threadID]);
  }

}
