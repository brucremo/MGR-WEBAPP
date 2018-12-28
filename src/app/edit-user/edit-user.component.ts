import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public user: User;
  id: string = "";
  private sub: any;
  constructor(private router: Router,
    private r: ActivatedRoute,
    private m: ApiService,
    private nav: NavServiceService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.nav.loggedInView();
    this.sub = this.r.params.subscribe(params => { this.id = stringify(params); })
    this.id = this.id.substring(3, this.id.length);
    this.user.USERID = this.id;

    this.m.getUser(this.user).subscribe(res => {
      this.user = res;
    }, err => {
      console.log(err);
    });
  }

  onSubmit(editform: NgForm): void {

    this.m.useredit(this.user).subscribe(res => { }, err => {
      console.log(err);
    });

    this.router.navigate(['/user/' + this.id]);
  }

  onCancel() {
    this.router.navigate(['/user/' + this.id]);
  }


}
