import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EnterpriseProfileRoutingModule } from './enterprise-profile-routing.module';
import { EnterpriseProfileComponent } from './enterprise-profile.component';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    EnterpriseProfileRoutingModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  declarations: [EnterpriseProfileComponent]
})
export class EnterpriseProfileModule { }
