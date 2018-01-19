import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailVerifyRoutingModule } from './email-verify-routing.module';
import { EmailVerifyComponent } from './email-verify.component';
import { EmailVerifyService } from './email-verify.service';

@NgModule({
  imports: [
    CommonModule,
    EmailVerifyRoutingModule
  ],
  declarations: [EmailVerifyComponent],
  providers:[EmailVerifyService]
})
export class EmailVerifyModule { }
