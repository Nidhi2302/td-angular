import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DriverStatusService } from './driver-status.service';
declare let $: any;
declare var google: any;
@Component({
  selector: 'app-driver-status',
  templateUrl: './driver-status.component.html',
  styleUrls: ['./driver-status.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DriverStatusComponent implements OnInit {
  public usersLocation: any = {};
  public map: any;
  public marker: any;
  public currentMarker: any;
  markers = [];
  bookedTruck = [];
  errMsg="";
  constructor(private driverStatusService: DriverStatusService) {

  }



  getUserCurrentLocation() {
    let self = this;
    navigator.geolocation.getCurrentPosition(function (location) {
      self.usersLocation = { lat: location.coords.latitude, lng: location.coords.longitude }
      self.initMap(self.usersLocation);
      self.getBookedTruck();
    },function(err){
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
    window.scrollTo(0, 0)
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

    this.createMarker(point, 'Current Location', '/assets/images/map_pin.png', "Current");
  }


  //createMarker
  createMarker(point, title, icon, position) {

    if (position == "removePin") {
      this.markers.forEach(mark => {
        mark.setMap(null);
      })
    } else {
      if (position != "Current") {

        this.marker = new google.maps.Marker({
          position: point,
          map: this.map,
          title: title,
          draggable: false,
          icon: icon
        });
        this.markers.push(this.marker);
      }
      else {
        this.currentMarker = new google.maps.Marker({
          position: point,
          map: this.map,
          title: title,
          draggable: false,
          icon: icon
        });
      }
    }

  }
  getBookedTruck() {
    this.driverStatusService.driverStatus().then(res => {
      this.bookedTruck = res["uData"];
      let icon;
      this.bookedTruck.map(record => {
        let point = { lat: record.location[1], lng: record.location[0] }
        if (!record.isBooked) {
          icon = "/assets/images/truck_green.png"
        } else {
          if (record.type == "Internal") {
            icon = "/assets/images/truck_red.png"
          } else {
            icon = "/assets/images/truck_black.png"
          }
        }
        this.createMarker(point, record.driver, icon, "notCurrent")
      })
    }).catch(err => {

    })
  }
  //filterBy
  filterBy(event) {
    this.createMarker('', '', '', 'removePin');
    let icon;
    if (event.target.value == "All") {
      this.getBookedTruck();
      return;
    }
    if (event.target.value == "Aval") {
      icon = "/assets/images/truck_green.png"
    } else {
      if (event.target.value == "Internal") {
        icon = "/assets/images/truck_red.png"
      } else {
        icon = "/assets/images/truck_black.png"
      }
    }

    this.bookedTruck.map(record => {
      let point = { lat: record.location[1], lng: record.location[0] }
      if (record.type == event.target.value && record.isBooked) {
        this.createMarker(point, record.driver, icon, "notCurrent")
      }else if(event.target.value=="Aval" && !record.isBooked){
        this.createMarker(point, record.driver, icon, "notCurrent")
      }
    })
  }

}
