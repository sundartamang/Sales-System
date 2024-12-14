import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services';
import { User } from '../model/user.model';
import { Role } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private key: string = 'users';

  constructor(private localStorageService: LocalStorageService) { }

  getItems(): Observable<any[]> {
    return this.localStorageService.getData<User[]>(this.key)
      .pipe(map((data) => data ? data : []))
  }

  getRoleItems(): Observable<any[]> {
    return this.localStorageService.getData<Role[]>('roles')
      .pipe(map((data) => data ? data : []))
  }

  saveItems(item: any): void {
    this.localStorageService.setData(this.key, [item]);
  }

  updateItem(item: User): void {
    this.localStorageService.updateData(this.key, item);
  }


  deleteItem(itemId: string): void {
    this.localStorageService.deleteData(this.key, itemId);
  }

}
