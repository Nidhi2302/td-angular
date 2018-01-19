import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonServiceService } from '../services/common-service/common-service.service';
import { AdminServiceService } from '../services/admin-service/admin-service.service';
import { ManagerServiceService } from '../services/manager-service/manager-service.service';
import { DriverServiceService } from '../services/driver-service/driver-service.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupFlowService } from '../services/signup-flow/signup-flow.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'about-us',
    loadChildren: './about/about.module#AboutModule'
  },
  {
    path: 'privacy-policy',
    loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule'
  },
  {
    path: 'terms-of-use',
    loadChildren: './terms-of-use/terms-of-use.module#TermsOfUseModule'
  },
  {
    path: 'sign-up',
    canLoad: [CommonServiceService],
    loadChildren: './sign-up/sign-up.module#SignUpModule'
  },
  {
    path: 'enterprise-sign-up',
    canLoad: [CommonServiceService],
    loadChildren: './enterprise-sign-up/enterprise-sign-up.module#EnterpriseSignUpModule'
  },
  {
    path: 'individual-sign-up',
    canLoad: [CommonServiceService],
    loadChildren: './individual-sign-up/individual-sign-up.module#IndividualSignUpModule'
  },
  {
    path: 'otp-verify',
    canLoad: [CommonServiceService],
    loadChildren: './otp-verify/otp-verify.module#OtpVerifyModule'
  },
  {
    path: 'logout',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'login',
    canLoad: [CommonServiceService],
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'forgot-password',
    canLoad: [CommonServiceService],
    loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule'
  },
  {
    path: 'reset-password',
    canLoad: [CommonServiceService],
    loadChildren: './reset-password/reset-password.module#ResetPasswordModule'
  },
  {
    path: 'set-password',
    canLoad: [CommonServiceService],
    loadChildren: './set-password/set-password.module#SetPasswordModule'
  },
  {
    path: 'email-verify',
    canLoad: [CommonServiceService],
    loadChildren: './email-verify/email-verify.module#EmailVerifyModule'
  },
  {
    path: 'terms-condition',
    canLoad:[SignupFlowService],
    loadChildren: './terms-condition/terms-condition.module#TermsConditionModule'
  },
  {
    path: 'profile',
    canLoad: [DriverServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'single-driver-onboarding',
    canLoad: [ManagerServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './single-driver-onboarding/single-driver-onboarding.module#SingleDriverOnboardingModule'
  },
  {
    path: 'change-password',
    canActivate: [CommonServiceService],
    loadChildren: './change-password/change-password.module#ChangePasswordModule'
  },
  {
    path: 'home-driver',
    canLoad: [DriverServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './home-driver/home-driver.module#HomeDriverModule'
  },
   {
    path: 'find-a-space',
    canLoad: [DriverServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './find-a-space/find-a-space.module#FindASpaceModule'
  },
  
    {
    path: 'find-a-space-detail',
    canLoad: [DriverServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './find-a-space-detail/find-a-space-detail.module#FindASpaceDetailModule'
  },
  {
    path: 'list-a-space',
    canLoad: [DriverServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './list-a-space/list-a-space.module#ListASpaceModule'
  },
    {
    path: 'report',
    canActivate: [CommonServiceService],
    loadChildren: './report/report.module#ReportModule'
  },
  {
    path: 'payment',
    canLoad:[SignupFlowService],
    loadChildren: './payment/payment.module#PaymentModule'
  },
  {
    path: 'admin-user-management',
    canLoad: [AdminServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './admin-user-management/admin-user-management.module#AdminUserManagementModule'
  },
  {
    path: 'logs',
    canLoad: [AdminServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './admin-logs/admin-logs.module#AdminLogsModule'
  },
  
  {
    path: 'enterprise-profile',
    canLoad: [ManagerServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './enterprise-profile/enterprise-profile.module#EnterpriseProfileModule'
  },
  {
    path: 'driver-history',
    canLoad: [DriverServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './history/history.module#HistoryModule'
  },
  {
    path: 'manager-history',
    canLoad: [ManagerServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './manager-history/manager-history.module#ManagerHistoryModule'
  },
  {
    path: 'manager-drivers',
    canLoad: [ManagerServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './manager-drivers/manager-drivers.module#ManagerDriversModule'
  },
  {
    path: 'driver-status',
    canLoad: [ManagerServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './driver-status/driver-status.module#DriverStatusModule'
  },
  
  {
    path: 'fraud-management',
    canLoad: [AdminServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './fraud-management/fraud-management.module#FraudManagementModule'
  },
  {
    path: 'fraud-management-detail',
    canLoad: [AdminServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './fraud-management-detail/fraud-management-detail.module#FraudManagementDetailModule'
  },
  {
    path: 'payment-report',
    canLoad: [AdminServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './payment-report/payment-report.module#PaymentReportModule'
  },
  {
    path: 'payment-details',
    canLoad: [AdminServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './payment-details/payment-details.module#PaymentDetailsModule'
  },
  {
    path: 'driver-notification',
    canActivate: [CommonServiceService],
    loadChildren: './driver-notification/driver-notification.module#DriverNotificationModule'
  },
  {
    path: 'admin-notification',
    canLoad: [AdminServiceService],
    canActivate: [CommonServiceService],
    loadChildren: './admin-notification/admin-notification.module#AdminNotificationModule'
  }, 
  {
    path: '**',
    component:NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }