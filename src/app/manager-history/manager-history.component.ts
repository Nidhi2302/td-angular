import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ManagerHistoryService } from './manager-history.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manager-history',
  templateUrl: './manager-history.component.html',
  styleUrls: ['./manager-history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManagerHistoryComponent implements OnInit {
  bookingHistory = [];
  listingHistory = [];
  perPageItem = 5;
  currentPageNumber = 1;
  totalRecord = 0;
  currentPageNumber1 = 1;
  totalRecord1 = 0;
  loading: boolean = false;
  bookMaxRecord=10;
  listMaxRecord=10;
  isLoading: boolean = false;
  constructor(private managerHistoryService: ManagerHistoryService, private router: Router) {
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
      maxRecord:this.bookMaxRecord
    }
    this.loading = true;
    this.managerHistoryService.bookingHistory(params).then(res => {
      console.log("bookingHistory", res);
      this.bookingHistory = res["uData"];
      this.totalRecord = res["totalCount"];
      this.loading = false;
    }).catch(err => {
      this.loading = false;
    })
  }
  //listing history
  getListingHistory() {
    let params = {
      start: this.currentPageNumber1,
      maxRecord:this.listMaxRecord
    }
    this.loading = true;
    this.managerHistoryService.listingHistory(params).then(res => {
      console.log("listingHistory", res);
      this.listingHistory = res["uData"];
      this.totalRecord1 = res["totalCount"];
      this.loading = false;
    }).catch(err => {
      this.loading = false;
    })
  }

}
