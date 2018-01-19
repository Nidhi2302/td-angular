import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FindASpaceDetailService } from './find-a-space-detail.service';
declare var google: any;
declare var $: any;
@Component({
  selector: 'app-find-a-space-detail',
  templateUrl: './find-a-space-detail.component.html',
  styleUrls: ['./find-a-space-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FindASpaceDetailComponent implements OnInit {
  public spaceDetail = {
    listedBy:'',
    phoneNumber:'',
    max_vehicle_size:'',
    description:''
  };
  available;
  map;
  marker;
  infoWindow;
  directionsDisplay;
  directionsService = new google.maps.DirectionsService();
  isLoading = false;
  errMsg;
  constructor(private actRoute: ActivatedRoute, private findASpaceDetailService: FindASpaceDetailService, private router: Router) {
    console.log(this.actRoute.snapshot.params['id']);
    this.findASpaceDetailService.getDetails(this.actRoute.snapshot.params['id']).then(res => {
      let self = this;
      this.spaceDetail = res[0];
      this.available = new Date(this.spaceDetail["available"]);
      // this.available = avaDate.getUTCDate() + "-" + (avaDate.getUTCMonth() + 1) + "-" + avaDate.getUTCFullYear() + " " + avaDate.getUTCHours() + ":" + avaDate.getUTCMinutes();
      let divMap = (<HTMLInputElement>document.getElementById('section-map1'));
      this.map = new google.maps.Map(divMap, {
        center: { lat: this.spaceDetail["location"][1], lng: this.spaceDetail["location"][0] },
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        draggable: true,
        zoomControl: true,
      });

      this.directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
      this.directionsDisplay.setMap(this.map);

      navigator.geolocation.getCurrentPosition(function (location) {
        let target = new google.maps.LatLng(self.spaceDetail["location"][1], self.spaceDetail["location"][0]);
        let origin = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        self.directionsService.route({
          origin: origin,
          destination: target,
          travelMode: 'DRIVING'
        }, function (response, status) {
          console.log(response);
          let leg = response.routes[0].legs[0];
          self.makeMarker(leg.start_location, '/assets/images/map_pin.png', 'Origin');
          let destinationMarker = self.makeMarker(leg.end_location, '/assets/images/map_pin_green.png', 'Destination');
          let distance = (leg.distance.value * 0.000621371).toFixed(2)
          let ETA = leg.duration.text.split(" ")[2] != undefined ? "0" + leg.duration.text.split(" ")[0] + ":" + leg.duration.text.split(" ")[2] : "00:" + leg.duration.text.split(" ")[0];
          let content = distance + " Miles:" + ETA;
          self.addInfoWindow(destinationMarker, content);
          if (status == 'OK') {
            self.directionsDisplay.setDirections(response);
          }
        });


      })
    }).catch(err => {
      this.router.navigate(['/not-found']);
    })
  }
  //marker
  makeMarker(position, icon, title) {
    return new google.maps.Marker({
      position: position,
      map: this.map,
      icon: icon,
      title: title
    });
  }
  //add InfoWindow 
  addInfoWindow(marker, content) {
    let self = this;
    this.infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', () => {
      self.infoWindow.setContent(content);
      self.infoWindow.open(self.map, marker);
    });
  }
  ngOnInit() {
  }
  bookSpace() {
    let params = {
      listedUserId: this.spaceDetail["listedUserId"],
      listingId: this.spaceDetail["listingId"]
    }
    this.isLoading = true;
    this.findASpaceDetailService.bookSapce(params).then(res => {
      console.log(res);
      this.isLoading = false;
      $('.alert.alert-success').show();
      setTimeout(() => {
        $('.alert.alert-success').hide();
      }, 6000);
      
      this.router.navigate(["/driver-history","bookedSpace"]);
    }).catch(err => {
      console.log("$ error",err);
      //this.errMsg = err.json();
      this.isLoading = false;
      $('.alert.alert-danger').show();
      setTimeout(() => {
        $('.alert.alert-danger').hide();
      }, 6000);
    })
  }
}
