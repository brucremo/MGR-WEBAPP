import { Component, OnInit } from '@angular/core';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private nav: NavServiceService) { }

  ngOnInit() {
    this.nav.loggedOutView();
    document.cookie = "username= ; max-age=-1;";
    localStorage.clear();
  }

}
