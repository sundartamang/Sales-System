import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services';
import { Item } from 'src/app/model/item.model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    private key: string = 'items';

    constructor(private localStorageService: LocalStorageService) { }

    getTotalSoldItems(): Observable<number> {
        return this.localStorageService.getData<Item[]>(this.key)
            .pipe(map((data) => {
                if (data) {
                    return data.reduce((total, item) => total + item.sold, 0);
                }
                return 0;
            }));
    }

    getSoldToday(): Observable<Item[]> {
        const today = new Date().toISOString().split('T')[0];

        return this.localStorageService.getData<Item[]>(this.key)
            .pipe(map((data) => {
                if (data) {
                    return data.filter(item => item.soldDate === today);
                }
                return [];
            }));
    }

    mostPopular(): Observable<Item[]> {
        return this.localStorageService.getData<Item[]>(this.key)
            .pipe(map((data) => {
                if (data) {
                    return data.sort((a, b) => b.sold - a.sold);
                }
                return [];
            }));
    }
}
