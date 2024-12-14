import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services';
import { Item } from 'src/app/model/item.model';

@Injectable({
    providedIn: 'root'
})
export class SellService {

    private key: string = 'items';

    constructor(private localStorageService: LocalStorageService) { }

    getSellItems(): Observable<Item[]> {
        return this.localStorageService.getData<Item[]>(this.key).pipe(
            map(items => items?.filter(item => item.sell) || [])
        );
    }

    searchItems(itemsName: string): Observable<any> {
        return this.localStorageService.getData<Item[]>(this.key).pipe(
            map(items => items?.filter(item => item.name.toLowerCase().includes(itemsName.toLowerCase())) || [])
        );
    }
}
