import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
    window.scrollTo(0, 0)
  }
  goTo(path){
    this.router.navigate([path]);
  }
}
