import { NgModule } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot()
  ],
  declarations: [LoginComponent, LogoutComponent],
  providers:[LoginService]
})
export class LoginModule { }
