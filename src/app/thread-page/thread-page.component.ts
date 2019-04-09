import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.css']
})
export class ThreadPageComponent implements OnInit {

  constructor(private router: Router,
    private r: ActivatedRoute,
    private api: ApiService) {
  }

  ngOnInit() {
   
  }
}
