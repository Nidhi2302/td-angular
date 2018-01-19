import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation/validation.service';
import { CommonServiceService } from '../../services/common-service/common-service.service';
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  map: any;
  recaptcha = '';
  currentMarker;
  infoWindow;
  feedback;
  public mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  constructor(private fb: FormBuilder,private cs:CommonServiceService) {
    sessionStorage.clear();
    this.feedback = this.fb.group({
      name: ['', Validators.required],
      organization: [''],
      email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      message: ['', Validators.required],
    })
  }

  ngOnInit() {
    console.log("google object", google);
    window.scrollTo(0, 0);
    this.initMap();
    document.getElementById("defaultOpen").click();
  }
  // map-section
  private initMap() {
    var point = { lat: 41.35207214451295, lng: -87.70935058593744 };
    let divMap = (<HTMLInputElement>document.getElementById('map-section'));
    this.map = new google.maps.Map(divMap, {
      center: point,
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      draggable: false,
      zoomControl: false
    });
    // this.currentMarker = new google.maps.Marker({
    //   position: { lat: 41.35207214451295, lng: -87.70935058593744 },
    //   map: this.map,
    //   title: 'Current Location.',
    //   draggable: false,
    //   icon: "/assets/images/pin.png"
    // });
    // let content = "<div class='img-sec'><img src='/assets/images/map_infowindow.png'/></div><div class='title-sec pl-xl-3 pl-lg-3'><h5>Monticello group hq</h5><h6 class='dir' id='openMap'><i class='fa fa-location-arrow' aria-hidden='true'></i>  get Direction</h6></div>";

    // this.infoWindow = new google.maps.InfoWindow();
    let self = this;
    // google.maps.event.addListener(this.currentMarker, 'click', () => {
    // this.infoWindow.setContent(content);
    // this.infoWindow.open(this.map, this.currentMarker);
    // let listener1 = google.maps.event.addListener(this.infoWindow, 'domready', function () {
    //   let direction = (<HTMLInputElement>document.getElementById('openMap'));
    //   direction.addEventListener('click', () => {
    //     console.log("direction click");
    //     self.openMap({ lat: 41.8333908, lng: -88.0128381 });
    //   })
    // })
    // google.maps.event.removeListener(listener1);
    // });
  }
  openMap(place) {
    window.open('http://maps.google.com?q=' + place.lat + ',' + place.lng);

  }
  resolved(captchaResponse: string) {
    this.recaptcha = captchaResponse;
  }
  openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  sendMessage(formData) {
    console.log(formData);
    let params=formData;
    this.cs.sendMessage(formData).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

  }

}
