import { Component, OnInit } from '@angular/core';
import { DashboardService } from './service/dashboard.service';
import { Item } from 'src/app/model/item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalSoldItems: number = 0;
  soldToday$!: Observable<Item[]>;
  mostPopularItems$!: Observable<Item[]>;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getTotalSoldItems();
    this.getSoldToday();
    this.getMostPopularItems();
  }

  getTotalSoldItems(): void {
    this.dashboardService.getTotalSoldItems().subscribe(total => {
      this.totalSoldItems = total;
    });
  }

  getSoldToday(): void {
    this.soldToday$ = this.dashboardService.getSoldToday();
  }

  getMostPopularItems(): void {
    this.mostPopularItems$ = this.dashboardService.mostPopular();
  }
}
