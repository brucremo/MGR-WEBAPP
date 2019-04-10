import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {

  public groupname: String;
  public threads = [];
  constructor(private router: Router,
    private r: ActivatedRoute,
    private api: ApiService) {
    this.groupname = "";
  }

  ngOnInit() {
    var str = window.location.href;
    var pos = str.search('groups/');
    var _str = str.slice(pos + 7);
    this.groupname = _str;


    //get threads
    console.log("---INITIATING THREAD RETRIEVAL---");
    console.log("id sent:" + this.groupname);
    // Get Threads for Discussion Board //
    var groupID = {
      "GROUPID": this.groupname
    };
    this.api.getThread(groupID).subscribe(res => {
      this.threads = res;
      console.log("Thread Retrieval: SUCCESS!");
      console.log(this.threads[0].THREAD_SUBJECT);
      console.log("Thread id: " + this.threads[0].THREAD_ID);
    }, err => {
      console.log("Could not retrieve all threads: " + err);
      //this.router.navigate(['/404']);
    });
  }

  ngAfterViewInit(){
    this.reloadOnce();
  }

  reloadOnce() {
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
