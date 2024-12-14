import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Role } from 'src/app/model';
import { LocalStorageService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private key: string = 'roles';

  constructor(private localStorageService: LocalStorageService) { }

  getItems(): Observable<any[]> {
    return this.localStorageService.getData<Role[]>(this.key)
      .pipe(map((data) => data ? data : []))
  }

  saveItems(item: any): void {
    this.localStorageService.setData(this.key, [item]);
  }

  updateItem(item: Role): void {
    this.localStorageService.updateData(this.key, item);
  }


  deleteItem(roleId: string): void {
    this.localStorageService.deleteData(this.key, roleId);
  }

}
