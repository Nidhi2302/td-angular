import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TermsOfUseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0)
  }

}
