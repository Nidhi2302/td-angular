import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from './../../services/validation/validation.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { FindASpaceService } from './find-a-space.service';
import { FindASpaceDetailService } from '../find-a-space-detail/find-a-space-detail.service';
import { GeneralService } from '../../services/general/general.service';
declare var google: any;
declare var $: any;

@Component({
  selector: 'app-find-a-space',
  templateUrl: './find-a-space.component.html',
  styleUrls: ['./find-a-space.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FindASpaceComponent implements OnInit {
  public usersLocation: any = {};
  public map: any;
  public marker: any;
  public currentMarker: any;
  public mapForm: FormGroup;
  radiuses = [5,10,25,50,100];
  cityCircle
  markers = [];
  infoWindow;
  destination = [];
  current
  isMap: boolean = true;
  listSpacesETA = [];
  listSpaces = [];
  errMsg='';
  messages={};
  constructor(private _fb: FormBuilder, localStorageService: LocalStorageService, private route: Router, private findASpaceService: FindASpaceService, public cd: ChangeDetectorRef,private findASpaceDetailService:FindASpaceDetailService) {
    // for (let i = 5; i < 16; i++) {
    //   this.radiuses.push(i);
    // }
    this.createListSpaceForm();
    //this.cd.detach();
    this.messages = GeneralService.getValidatorErrorMessage();
  }

  createListSpaceForm() {
    this.mapForm = this._fb.group({
      lat: ['', Validators.compose([Validators.required,ValidationService.isLat])],
      lng: ['', Validators.compose([Validators.required,ValidationService.isLng])],
      radius: [this.radiuses[1], Validators.compose([Validators.required])],
    })
  }

  getUserCurrentLocation() {
    let self = this;
    navigator.geolocation.getCurrentPosition(function (location) {
      console.log("location",location);
      self.usersLocation = { lat: location.coords.latitude, lng: location.coords.longitude }
      self.initMap(self.usersLocation);
      self.mapForm.get('lat').setValue(self.usersLocation.lat);
      self.mapForm.get('lng').setValue(self.usersLocation.lng);
      self.findASpace();
    },function(err){
      console.log("location err",err);
      self.errMsg = "Location is not accessable.Please check location setting."
			$('.alert.alert-danger').show();
			setTimeout(() => {
				$('.alert.alert-danger').hide();
			}, 6000);
    });
  }

  getUserCurrentLocation2() {
    let self = this;
    navigator.geolocation.getCurrentPosition(function (location) {
      self.usersLocation = { lat: location.coords.latitude, lng: location.coords.longitude }
      // self.initMap(self.usersLocation);
      self.mapForm.get('lat').setValue(self.usersLocation.lat);
      self.mapForm.get('lng').setValue(self.usersLocation.lng);
      self.findASpace();
     } ,function(err){
        console.log("location err",err);
        self.errMsg = "Location is not accessable.Please check location setting."
        $('.alert.alert-danger').show();
        setTimeout(() => {
          $('.alert.alert-danger').hide();
        }, 6000);
      });
  }

  ngOnInit() {
    this.getUserCurrentLocation();
  }

  // map-section
  public initMap(point) {
    let self = this;
    if (!point) {
      point = { lat: 41.8333925, lng: -88.0121478 };
    }

    let divMap = (<HTMLInputElement>document.getElementById('section-map'));

    this.map = new google.maps.Map(divMap, {
      center: point,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: false,
      draggable: true,
      zoomControl: true
    });
    this.cityCircle = new google.maps.Circle({
      strokeColor: '#1765A3',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#1765A3',
      fillOpacity: 0.35,
      map: self.map,
      center: point,
      radius: self.mapForm.get('radius').value * 1609.34
    });

    this.createMarker(point, true, '/assets/images/map_pin.png', "Current", "","");

    google.maps.event.addListener(this.currentMarker, 'click', function (event) {
      self.usersLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      self.mapForm.get('lat').setValue(self.usersLocation.lat);
      self.mapForm.get('lng').setValue(self.usersLocation.lng);
      self.drawCircle(self.usersLocation, self.mapForm.get('radius').value)
    });

    google.maps.event.addListener(this.currentMarker, 'dragend', function (event) {
      self.usersLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      self.mapForm.get('lat').setValue(self.usersLocation.lat);
      self.mapForm.get('lng').setValue(self.usersLocation.lng);
      self.drawCircle(self.usersLocation, self.mapForm.get('radius').value)
    });

    google.maps.event.addListener(this.map, 'click', function (event) {
      self.usersLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      self.currentMarker.setPosition(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
      self.mapForm.get('lat').setValue(self.usersLocation.lat);
      self.mapForm.get('lng').setValue(self.usersLocation.lng);
      self.drawCircle(self.usersLocation, self.mapForm.get('radius').value)

    });

  }
  changeMaker(){
    this.currentMarker.setPosition(new google.maps.LatLng(parseFloat(this.mapForm.get('lat').value),parseFloat(this.mapForm.get('lng').value)));
  }
  //selectRadius
  selectRadius() {
    let self = this;
    self.usersLocation = { lat: parseFloat(this.mapForm.get('lat').value), lng: parseFloat(this.mapForm.get('lng').value) };
    self.mapForm.get('lat').setValue(self.usersLocation.lat);
    self.mapForm.get('lng').setValue(self.usersLocation.lng);
    self.drawCircle(self.usersLocation, this.mapForm.get('radius').value);
    this.cd.detectChanges();
  }
  //draw circle
  drawCircle(point, radius) {
    this.cityCircle.setMap(null);
    this.cityCircle = new google.maps.Circle({
      strokeColor: '#1765A3',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#1765A3',
      fillOpacity: 0.35,
      map: this.map,
      center: point,
      radius: parseInt(radius) * 1609.34
    });

  }
  //createMarker
  createMarker(point, draggable, icon, position, content,id) {

    if (position == "removePin") {
      this.markers.forEach(mark => {
        mark.setMap(null);
      })
    } else {
      if (position != "Current") {
        
        this.marker = new google.maps.Marker({
          position: point,
          map: this.map,
          title: 'Other Location',
          draggable: draggable,
          icon: icon
        });
        this.markers.push(this.marker);
        this.addInfoWindow(this.marker, content,id);
      }
      else {
        this.currentMarker = new google.maps.Marker({
          position: point,
          map: this.map,
          title: 'Current Location.',
          draggable: draggable,
          icon: icon
        });
      }
    }

  }
  //findASpace
  findASpace() {
   
    this.mapForm.value['radius'] = parseInt(this.mapForm.get('radius').value);
    this.current = { lat: parseFloat(this.mapForm.get('lat').value), lng: parseFloat(this.mapForm.get('lng').value) }
    if(this.mapForm.valid){
      this.mapForm.get('lat').setValue(parseFloat(this.mapForm.get('lat').value))
      this.mapForm.get('lng').setValue(parseFloat(this.mapForm.get('lng').value))
      this.findASpaceService.findASpace(this.mapForm.value).then(res => {
      this.listSpaces = res["uData"];
      this.listSpaces=this.listSpaces.filter(record=>!record.isBooked)
      this.calculateETA();
    }).catch(err => {
      this.errMsg = err.json();
			$('.alert.alert-danger').show();
			setTimeout(() => {
				$('.alert.alert-danger').hide();
			}, 6000);
      console.log(err)
    })}
  }
  //calculate ETA
  calculateETA() {
    let self = this;
    let origins = [];
    let destinations = [];
    let icon = "/assets/images/map_pin_green.png";

    if (this.listSpaces.length == 0) {
      this.createMarker({}, true, "", "removePin", "","");
      this.listSpacesETA = [];
    } else {
      this.listSpaces.forEach((dest) => {
        let origin = new google.maps.LatLng(this.current.lat, this.current.lng);
        let destination = new google.maps.LatLng(dest.location[1], dest.location[0]);
        origins.push(origin);
        destinations.push(destination);

      })
      let service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: origins,
          destinations: destinations,
          travelMode: 'DRIVING'
        }, (response, status) => {
          // See Parsing the Results for
          // the basics of a callback function.
          console.log(response, status)
          if (status == "OK") {
            this.markers.forEach(mark => {
              mark.setMap(null);
            })
            this.markers=[];
            self.listSpacesETA = [];
            for (let i = 0; i < response.rows[0].elements.length; i++) {
              let distance=(response.rows[0].elements[i].distance.value * 0.000621371).toFixed(2)
              let ETA=response.rows[0].elements[i].duration.text.split(" ")[2]!=undefined ?  "0"+response.rows[0].elements[i].duration.text.split(" ")[0]+":"+response.rows[0].elements[i].duration.text.split(" ")[2] : "00:"+response.rows[0].elements[i].duration.text.split(" ")[0];
              //console.log("prepare content",self.listSpaces[i]);
              let avaDate=new Date(self.listSpaces[i].available);
              let content = distance+ "Miles :" + ETA+"ETA<br> Available at:"+avaDate.toLocaleDateString()+" "+avaDate.toLocaleTimeString()+"<br><a href='javascript:void(0)' id='goToDetail'> Book </a>";
              let point = { lat: self.listSpaces[i].location[1], lng: self.listSpaces[i].location[0] }
              if(self.listSpaces[i].type=="Internal"){
                icon = "/assets/images/map_pin_green.png";
              }else{
                icon = "/assets/images/map_pin_black.png";
              }
              if (!self.listSpaces[i].isBooked) {
                self.createMarker(point, false, icon, "notCurrent", content,self.listSpaces[i]._id);
                let distanceETA = {
                  distance: distance,
                  ETA:ETA,
                  id:self.listSpaces[i]._id,
                  listedUserId:self.listSpaces[i].listedUserId,
                  listingId:self.listSpaces[i].listingId
                }
                self.listSpacesETA.push(distanceETA);
              } 
              
              
            }
            console.log(self.listSpacesETA);
            
            self.sorintgAs(self.listSpacesETA,"distance");
            self.cd.detectChanges();
          }
          else{
            self.listSpacesETA = [];
          }
        })
    }
    

  }

  //add InfoWindow 
  addInfoWindow(marker, content,id) {
    let self = this;
    this.infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', () => {
      self.infoWindow.setContent(content);
      self.infoWindow.open(self.map, marker);
      let listener1 = google.maps.event.addListener(this.infoWindow, 'domready', function () {
        let direction = (<HTMLInputElement>document.getElementById('goToDetail'));
        direction.addEventListener('click', () => {
            console.log("direction click");
            self.goToDetail(id);
        })
      })
    });
  }
  //changeView
  changeView() {
    this.isMap = !this.isMap;
    if (this.isMap) {
      setTimeout(() => {
        this.getUserCurrentLocation();
      }, 10);

    }
  }
  //sortBy
  sortBy(event) {
    switch (event.target.value) {
      case "DSL": this.sorintgAs(this.listSpacesETA, "distance"); break;
      case "DLS": this.sorintgDe(this.listSpacesETA, "distance"); break;
      case "ELM": this.sorintgAs2(this.listSpacesETA, "ETA"); break;
      case "EML": this.sorintgDe2(this.listSpacesETA, "ETA"); break;
    }
    this.cd.detectChanges();
  }
  sorintgAs(list, key) {
    list.sort((a: any, b: any) => {
      if (parseFloat(a[key]) < parseFloat(b[key])) {
        return -1;
      } else if (parseFloat(a[key]) > parseFloat(b[key])) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  sorintgDe(list, key) {
    list.sort((a: any, b: any) => {
      if (parseFloat(a[key]) < parseFloat(b[key])) {
        return 1;
      } else if (parseFloat(a[key]) > parseFloat(b[key])) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  sorintgAs2(list, key) {
    list.sort((a: any, b: any) => {
      if (Date.parse('01/01/2011 '+(a[key])) < Date.parse('01/01/2011 '+(b[key]))) {
        return -1;
      } else if (Date.parse('01/01/2011 '+(a[key])) > Date.parse('01/01/2011 '+(b[key]))) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  sorintgDe2(list, key) {
    list.sort((a: any, b: any) => {
      if (Date.parse('01/01/2011 '+(a[key])) < Date.parse('01/01/2011 '+(b[key]))) {
        return 1;
      } else if (Date.parse('01/01/2011 '+(a[key])) > Date.parse('01/01/2011 '+(b[key]))) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  //goToDetail
  goToDetail(id){
    
    this.route.navigate(["/find-a-space-detail/"+id])
    
  }
  bookSpace(item){
    let params={
      listedUserId: item["listedUserId"],
      listingId: item["listingId"]
    }
    this.findASpaceDetailService.bookSapce(params).then(res => {
      $('.alert.alert-success').show();
      setTimeout(() => {
        $('.alert.alert-success').hide();
      }, 6000);
      this.findASpace();
    }).catch(err => {
      console.log("$ error",err);
      //this.errMsg = err.json();
      $('.alert.alert-danger').show();
      setTimeout(() => {
        $('.alert.alert-danger').hide();
      }, 6000);
    })
  }
}
