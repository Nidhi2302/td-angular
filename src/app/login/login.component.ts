import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from './../../services/validation/validation.service';
import { LoginService } from './login.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
	public recaptcha = '';
	public loginForm: FormGroup;
	back;
	back1;
	errMsg;
	errMsg2;
	constructor(private LS: LoginService, private _fb: FormBuilder,private localStorageService:LocalStorageService, private route: Router) {
		if(localStorage.getItem("secret_token")){
			this.route.navigate([localStorage.getItem("home")])
		}
		this.createLoginForm();
		if(sessionStorage.getItem("back")=="true"){
			this.back=sessionStorage.getItem("back");
			this.errMsg2=sessionStorage.getItem("errMsg");
		sessionStorage.clear()		
		}else{
			this.back=false;
		};
		
	}

	createLoginForm() {
		this.loginForm = this._fb.group({
			email: ['', Validators.compose([Validators.required])],
			password: ['', Validators.compose([Validators.required])],
		})
	}

	userLogin(loginData: any) {
		console.log(loginData);
		this.LS.login(loginData).then(res => {
			console.log(res);
			localStorage.setItem('secret_token', res['secteteToken']);
			localStorage.setItem('userType', res['uData'][0]['userType']);
			localStorage.setItem('username', res['uData'][0]['username']);
			localStorage.setItem('firstname', res['uData'][0]['firstname']);
			localStorage.setItem('password', res['uData'][0]['password']);
			localStorage.setItem('id', res['uData'][0]['_id']);
			localStorage.setItem('badgeCount', res['uData'][0]['badgeCount']);
			localStorage.setItem('role', res['uData'][0]['role']);
			console.log("inside submit", res);
			if(res['uData'][0]['role'] == 'super') {
				localStorage.setItem('name', res['uData'][0]['name']);
				this.route.navigate(['/admin-user-management']);
				localStorage.setItem('home', 'admin-user-management');
			} else {
				if(res['uData'][0]['userType'] == 'Individual') {
					this.route.navigate(['/home-driver']);
					localStorage.setItem('home', 'home-driver');
				} else {
					this.route.navigate(['/driver-status']);
					localStorage.setItem('home', 'driver-status');
				}
			}
		}).catch(err => {
			this.back1=true;
			this.errMsg=err.json();
		})
	}

	ngOnInit() {
	}

	resolved(captchaResponse: string) {
        this.recaptcha = captchaResponse;
    }
}
