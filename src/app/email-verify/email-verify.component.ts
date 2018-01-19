import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailVerifyService } from './email-verify.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EmailVerifyComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute, private router: Router, private emailVerifyService: EmailVerifyService) {
    console.log(this.actRoute.snapshot.params['userId']);
    this.emailVerifyService.emailVerify(this.actRoute.snapshot.params['userId']).then((res) => {
     // this.router.navigate(['/login']);
      
    }).catch((err) => {
      this.router.navigate(["/not-found"])
    })

  }

  ngOnInit() {
  }

}
