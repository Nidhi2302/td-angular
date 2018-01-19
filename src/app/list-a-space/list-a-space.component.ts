import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from './../../services/validation/validation.service';
import { ListASpaceService } from './list-a-space.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { GeneralService } from '../../services/general/general.service';
declare var google: any;
declare let $: any;
@Component({
	selector: 'app-list-a-space',
	templateUrl: './list-a-space.component.html',
	styleUrls: ['./list-a-space.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class ListASpaceComponent implements OnInit {
	public usersLocation: any = {};
	public map: any;
	public marker: any;
	public listSpaceForm: FormGroup;
	public errMsg;
	public updatedDate = new Date();
	public hourFormat: any = [];
	public minFormat: any = [];
	public maxHours: number = 23;
	public maxMins: number = 59;
	public isNew: Boolean = true;
	public messages: any = {};
	isLoading = false;
	helpMsg=true;
	constructor(private _fb: FormBuilder, localStorageService: LocalStorageService, private route: Router, private LASS: ListASpaceService) {
		let self = this;
		self.createListSpaceForm();

		for (let i = 0; i <= self.maxHours; i++) {
			self.hourFormat.push({ 'key': i, 'value': i });
		}

		for (let i = 0; i <= self.maxMins; i++) {
			self.minFormat.push({ 'key': i, 'value': i });
		}

		self.messages = GeneralService.getValidatorErrorMessage();
	}

	ngOnInit() {
		let self = this;
		self.getUserCurrentLocation();
	}

	public createListSpaceForm() {
		let self = this;
		self.listSpaceForm = self._fb.group({
			lat: ['', Validators.compose([Validators.required])],
			lng: ['', Validators.compose([Validators.required])],
			length: ['', Validators.compose([Validators.required, ValidationService.checkOnlyNumber])],
			// availableFrom: ['', Validators.compose([Validators.required])],
			hours: ['', Validators.compose([Validators.required])],
			mins: ['', Validators.compose([Validators.required])],
			desc: ['', Validators.compose([Validators.required])]
		})
		self.isNew = true;
	}

	public updateHours(value, type) {
		let self = this;
		self.updatedDate = new Date();
		if (type == 'hour') {
			if (self.listSpaceForm.get('mins').value == '') {
				self.listSpaceForm.get('mins').setValue(0);
				self.updatedDate.setHours(value, 0, 0, 0);
			} else {
				self.updatedDate.setHours(value, self.listSpaceForm.get('mins').value, 0, 0);
			}
		} else {
			if (self.listSpaceForm.get('hours').value == '') {
				self.listSpaceForm.get('hours').setValue(0);
				self.updatedDate.setHours(0, value, 0, 0);
			} else {
				self.updatedDate.setHours(self.listSpaceForm.get('hours').value, value, 0, 0);
			}
		}
		let currentTime = new Date();
		console.log(this.updatedDate)
		if (self.updatedDate.getTime() < currentTime.getTime()) {
			self.updatedDate.setDate(currentTime.getDate() + 1);
		}
	}

	public getUserCurrentLocation() {
		let self = this;
		navigator.geolocation.getCurrentPosition(function (location) {
			self.usersLocation = { lat: location.coords.latitude, lng: location.coords.longitude }
			self.initMap(self.usersLocation);
			self.listSpaceForm.get('lat').setValue(self.usersLocation.lat);
			self.listSpaceForm.get('lng').setValue(self.usersLocation.lng);
		},function(err){
			console.log("location err",err);
			self.errMsg = "Location is not accessable.Please check location setting."
				  $('.alert.alert-danger').show();
				  setTimeout(() => {
					  $('.alert.alert-danger').hide();
				  }, 6000);
		  });
	}

	// map-section
	public initMap(point) {
		let self = this;
		if (!point) {
			point = { lat: 41.8333925, lng: -88.0121478 };
		}
		//var point = { lat: parseFloat(this.usersLocation[0]), lng: parseFloat(this.usersLocation[1]) };
		let divMap = (<HTMLInputElement>document.getElementById('section-map'));
		self.map = new google.maps.Map(divMap, {
			center: point,
			zoom: 7,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: false,
			draggable: true,
			zoomControl: true
		});

		self.marker = new google.maps.Marker({
			position: point,
			map: self.map,
			title: 'Choose Your Location.',
			draggable: true,
			icon:'/assets/images/map_pin.png'
		});

		google.maps.event.addListener(this.marker, 'click', function (event) {
			self.usersLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
			self.listSpaceForm.get('lat').setValue(self.usersLocation.lat);
			self.listSpaceForm.get('lng').setValue(self.usersLocation.lng);
		});

		google.maps.event.addListener(this.marker, 'dragend', function (event) {
			self.usersLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
			self.listSpaceForm.get('lat').setValue(self.usersLocation.lat);
			self.listSpaceForm.get('lng').setValue(self.usersLocation.lng);
		});

		google.maps.event.addListener(this.map, 'click', function (event) {
			self.usersLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
			self.marker.setPosition(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
			self.listSpaceForm.get('lat').setValue(self.usersLocation.lat);
			self.listSpaceForm.get('lng').setValue(self.usersLocation.lng);
		});
	}

	public addSpaceDetails(listSpaceData: any) {
		let self = this;
		let paramsToSend: any = {};
		let location: any = [];
		location['lat'] = listSpaceData.lat;
		location['lng'] = listSpaceData.lng;
		paramsToSend.location = location;
		console.log(self.updatedDate)
		console.log(self.updatedDate.getUTCHours());
		paramsToSend = {
			'available': self.updatedDate,
			'description': listSpaceData.desc,
			'max_vehicle_size': listSpaceData.length,
			'lat': listSpaceData.lat,
			'lng': listSpaceData.lng
		}
		this.isLoading = true;
		self.LASS.createSpace(paramsToSend).then(res => {
			console.log(res);
			self.createListSpaceForm();
			this.isLoading = false;
			$('.alert.alert-success').show();
			setTimeout(() => {
				$('.alert.alert-success').hide();
			}, 6000);
			this.helpMsg=false;
			// setTimeout(() => {
			//  this.helpMsg=true;
			// }, 7000);
		}).catch(err => {
			self.errMsg = err.json();
			this.isLoading = false;
			$('.alert.alert-danger').show();
			setTimeout(() => {
				$('.alert.alert-danger').hide();
			}, 6000);
		})
	}
	createMaker(){
		this.marker.setPosition(new google.maps.LatLng(parseFloat(this.listSpaceForm.get('lat').value) ,parseFloat(this.listSpaceForm.get('lng').value)))
	}
}
