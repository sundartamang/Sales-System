import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, Subscription, switchMap } from 'rxjs';
import { SellService } from './service/sell.service';
import { Item } from 'src/app/model/item.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  noResults: boolean = false;
  sellItems$!: Observable<Item[]>;
  showAllItems: boolean = true;

  private searchSubscription!: Subscription;

  constructor(private sellService: SellService, private fb: FormBuilder) {
    this.formInitializer();
  }

  ngOnInit(): void {
    this.sellItem();
    this.setupSearchListener();
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  sellItem(): void {
    this.sellItems$ = this.sellService.getSellItems();
  }

  private setupSearchListener(): void {
    this.searchSubscription = this.searchForm.get('name')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(itemName =>
          itemName.trim() ? this.sellService.searchItems(itemName.trim()) : this.sellService.getSellItems()
        )
      )
      .subscribe(items => {
        console.log("searched data is ", items);
        this.noResults = items.length === 0;
        this.sellItems$ = of(items);
      })!;
  }

  private formInitializer(): void {
    this.searchForm = this.fb.group({
      name: [''],
    });
  }
}
