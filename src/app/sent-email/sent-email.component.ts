import { Component, OnInit } from '@angular/core';
import { NavServiceService } from 'src/app/nav-service.service';

@Component({
  selector: 'app-sent-email',
  templateUrl: './sent-email.component.html',
  styleUrls: ['./sent-email.component.css']
})
export class SentEmailComponent implements OnInit {

  constructor(private nav: NavServiceService) { }

  ngOnInit() {
    this.nav.loggedOutView();
  }

}
