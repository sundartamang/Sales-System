import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services';
import { Item } from 'src/app/model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private key: string = 'items';

  constructor(private localStorageService: LocalStorageService) { }

  getItems(): Observable<any[]> {
    return this.localStorageService.getData<Item[]>(this.key)
      .pipe(map((data) => data ? data : []))
  }

  saveItems(item: any): void {
    this.localStorageService.setData(this.key, [item]);
  }

  updateItem(item: Item): void {
    this.localStorageService.updateData(this.key, item);
  }


  deleteItem(itemId: string): void {
    this.localStorageService.deleteData(this.key, itemId);
  }

}
