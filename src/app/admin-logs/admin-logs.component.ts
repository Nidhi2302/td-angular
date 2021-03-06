import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { AdminLogsService } from './admin-logs.service';
@Component({
  selector: 'app-admin-logs',
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLogsComponent implements OnInit {
  bookingHistory = [];
  listingHistory = [];
  maxDate = new Date();
  bsConfig: Partial<BsDatepickerConfig>;
  perPageItem = 5;
  currentPageNumber = 1;
  totalRecord = 0;
  currentPageNumber1 = 1;
  totalRecord1 = 0;
  loading: boolean = false;
  fromDate;
  toDate;
  sorting="listedBy";
  fromDate1;
  toDate1;
  sorting1="bookedBy";
  isLoading: boolean = false;
  constructor(private adminLogsService: AdminLogsService, private router: Router) {
    this.bsConfig = Object.assign({}, { containerClass: "theme-dark-blue", showWeekNumbers: false,dateInputFormat: 'DD/MM/YYYY' })
    this.getBookingHistory();
    this.getListingHistory();
  }

  ngOnInit() {
  }

  //pagination
  getPage(event, tab) {

    let pageNumber = parseInt(event);
    if (tab == "book") {
      this.currentPageNumber = pageNumber;
      this.getBookingHistory();
    } else {
      this.currentPageNumber1 = pageNumber;
      this.getListingHistory();
    }

  }
  //booking history
  getBookingHistory() {
    let params = {
      start: this.currentPageNumber,
      fromDate: this.fromDate,
      toDate: this.toDate,
      sortBy:{}
    }
    params["sortBy"][this.sorting] = 1;
    this.loading = true;
    this.adminLogsService.bookingHistory(params).then(res => {
      console.log("bookingHistory", res);
      this.bookingHistory = res["uData"];
      this.totalRecord = res["totalCount"];
      this.bookingHistory.map((record) => {
        let lat = (record["location"][0][1]).toFixed(4)
        let lng = (record["location"][0][0]).toFixed(4)
        record["acLocation"] = lat + "'N  " + lng + "'E"
        return record;
      })
      this.loading = false;
    }).catch(err => {
      this.loading = false;
    })
  }
  //listing history
  getListingHistory() {
    let params = {
      start: this.currentPageNumber1,
      fromDate: this.fromDate1,
      toDate: this.toDate1,
      sortBy:{}
    }
    params["sortBy"][this.sorting1] = 1
    this.loading = true;
    this.adminLogsService.listingHistory(params).then(res => {
      console.log("listingHistory", res);
      this.listingHistory = res["uData"];
      this.totalRecord1 = res["totalCount"];
      this.listingHistory.map((record) => {
        let lat = (record["location"][1]).toFixed(4)
        let lng = (record["location"][0]).toFixed(4)
        record["acLocation"] = lat + "'N  " + lng + "'E";
        record["bookedBy"] = record["bookedBy"] != null ? record["bookedBy"] : "Not Booked"
        return record;
      })
      this.loading = false;
    }).catch(err => {
      this.loading = false;
    })
  }

}
