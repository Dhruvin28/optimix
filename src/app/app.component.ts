import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'optimix';
  isLogin = true;

  constructor(private readonly activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(r => {

      if (window.location.href.includes('login')) {
        this.isLogin = true;
      }
      else {
        this.isLogin = false;
      }
    });
  }
}
