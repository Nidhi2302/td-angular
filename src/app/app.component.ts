import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../services/notification/notification.service';
declare let $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'app';
  public adminHeader = false;
  public driverHeader = false;
  public normalHeader = false;
  public managerHeader = false;
  public name = '';
  public userType = '';
  public url
  badgeCount='';
  currentDate=new Date();
  currentYear=this.currentDate.getFullYear();

  constructor(private router: Router,private notificationService:NotificationService) {
    this.setLoginParams();
    let self = this
    if (!localStorage.getItem('secret_token')) {
      this.router.events.subscribe((event) => {
        //console.log(event);
        if (event instanceof NavigationEnd) {
          self.url = event.url;
          // console.log("url", self.url)

          switch (self.url) {
            case '/': this.menuItem(0); break;
            case '/about-us': this.menuItem(1); break;
            case '/contact': this.menuItem(2); break;
            case '/login': this.menuItem(3); break;
            default:this.menuItem(4);break;
          }
        }
      });
    }

  }

  setLoginParams() {
    var newName = localStorage.getItem('firstname');
    if (this.name != newName) {
      this.adminHeader = false;
      this.driverHeader = false;
      this.normalHeader = false;
      this.managerHeader = false;
      this.userType = localStorage.getItem('userType');
      this.badgeCount = localStorage.getItem('badgeCount');
      if (this.badgeCount != '0') {
        $('<style>.badge::after{content:"' + this.badgeCount + '" !important}</style>').appendTo('head');
      }else{
        $('<style>.badge::after{content:unset !important}</style>').appendTo('head');
      }
      if (localStorage.getItem('role') == "super") {
        this.adminHeader = true;
        newName = localStorage.getItem('name');
      } else if (localStorage.getItem('userType') == 'Individual') {
        this.driverHeader = true;
        newName = localStorage.getItem('username');
      } else if (localStorage.getItem('userType') == 'Enterprise') {
        this.managerHeader = true;
      } else {
        this.normalHeader = true;

      }


      this.name = newName;
    }
  }

  ngDoCheck() {
    this.setLoginParams();
  }

  ngOnInit() {
    setInterval(() => {
      if(localStorage.getItem("secret_token")){
        this.notificationService.getBadgeCount().then(res=>{
          localStorage.setItem("badgeCount",res["badgeCount"]);
          this.badgeCount=res["badgeCount"]+"";
          if (this.badgeCount != '0') {
            $('<style>.badge::after{content:"' + this.badgeCount + '" !important}</style>').appendTo('head');
          }else{
            $('<style>.badge::after{content:unset !important}</style>').appendTo('head');
          }
        }).catch(err=>{
          //nothing
        })
      }
    },5000);
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "310px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  menuItem(item) {
    // console.log(document.getElementsByClassName("nav-item"));
    setTimeout(() => {
      for (let i = 0; i < 4; i++) {
        document.getElementsByClassName("nav-item")[i].setAttribute("class", 'nav-item');
      }
      document.getElementsByClassName("nav-item")[item].setAttribute("class", 'nav-item active');
      document.getElementsByClassName("navbar-toggler")[0].setAttribute("aria-expanded", "false")
      document.getElementById("navbarNavDropdown").setAttribute("class", "collapse navbar-collapse")
      document.getElementById("navbarNavDropdown").setAttribute("aria-expanded", "false")
    }, 500)
  }
}
