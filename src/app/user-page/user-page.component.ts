import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  public user: User;
  id: string = "";
  public nav: NavServiceService;
  constructor(private router: Router,
    private r: ActivatedRoute,
    private m: ApiService) {

    this.nav = new NavServiceService();
    this.user = new User();
  }

  reloadPage() {
    var refresh = window.localStorage.getItem('refresh');
    console.log(refresh);
    if (refresh === null) {
      window.location.reload();
      window.localStorage.setItem('refresh', "1");
    }
  }

  ngOnInit() {
    if (document.cookie) {
      this.nav.loggedInView();
              
      this.r.params.subscribe(params => { this.id = stringify(params); })
      this.id = this.id.substring(3, this.id.length);
      this.user.USERID = this.id;
      
      this.m.getUser(this.user).subscribe(res => {
        this.user = res;
      }, err => {
        console.log(err);
        this.router.navigate(['/404']);
      });  
  
    } else {
      this.r.params.subscribe(params => { this.id = stringify(params); })
      this.id = this.id.substring(3, this.id.length);
      this.user.USERID = this.id;
          
      this.m.getUser(this.user).subscribe(res => {
        this.user = res;
      }, err => {
        console.log(err);
        this.router.navigate(['/404']);
      });
  
      //this.reloadPage();
  
      this.nav.loggedOutView();
    }

    //this.reloadPage();
    //this.reloadPage();

    console.log("the cookie with this account is: " + document.cookie);
  }
}
