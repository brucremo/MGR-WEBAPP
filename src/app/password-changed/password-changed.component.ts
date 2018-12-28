import { Component, OnInit } from '@angular/core';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-password-changed',
  templateUrl: './password-changed.component.html',
  styleUrls: ['./password-changed.component.css']
})
export class PasswordChangedComponent implements OnInit {

  constructor(private nav: NavServiceService) { }

  ngOnInit() {
    this.nav.loggedOutView();
  }

}
