import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseModel } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getData<T>(key: string): Observable<T | null> {
    const storedData = this.getExistingData(key);
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (Array.isArray(parsedData)) {
        const matchedItem = parsedData.find(item => item.key === key);
        return of(matchedItem ? (matchedItem.data as T) : null).pipe(delay(this.randomDelay()));
      }

      if (parsedData.key === key) {
        return of(parsedData.data as T).pipe(delay(this.randomDelay()));
      }
    }
    return of(null).pipe(delay(this.randomDelay()));
  }

  setData<T>(key: string, data: T[]): void {
    const existingData = localStorage.getItem(key);

    if (existingData) {
      const parsedData = JSON.parse(existingData);

      const lastItem = parsedData.data[parsedData.data.length - 1];
      let id = lastItem ? lastItem.id + 1 : 1;

      const newData = data.map(item => ({
        ...item,
        id: id++
      }));

      parsedData.data = [...parsedData.data, ...newData];
      localStorage.setItem(key, JSON.stringify(parsedData));

    } else {
      const newData = data.map((item, index) => ({
        ...item,
        id: index + 1
      }));

      const storageData = { key, data: newData };
      this.saveDataInLocalStorage(key, storageData);
    }
  }

  updateData<T>(key: string, updatedItem: any): Observable<T | null> {
    const existingData = localStorage.getItem(key);

    if (existingData) {
      const parsedData = JSON.parse(existingData);

      const index = parsedData.data.findIndex((item: any) => item.id === updatedItem.id);

      if (index !== -1) {
        parsedData.data[index] = { ...parsedData.data[index], ...updatedItem };
        this.saveDataInLocalStorage(key, { key, data: parsedData.data });

        return of(parsedData.data as T).pipe(delay(this.randomDelay()));
      }
    }

    return of(null).pipe(delay(this.randomDelay()));
  }

  deleteData<T>(key: string, id: String): Observable<T | null> {
    const existingData = localStorage.getItem(key);
    if (existingData) {
      const parsedData = JSON.parse(existingData);

      const index = parsedData.data.findIndex((item: any) => item.id === id);

      if (index !== -1) {
        parsedData.data.splice(index, 1);
        this.saveDataInLocalStorage(key, { key, data: parsedData.data });

        return of(parsedData.data as T).pipe(delay(this.randomDelay()));
      }
    }
    return of(null).pipe(delay(this.randomDelay()));
  }

  private randomDelay(): number {
    return Math.floor(Math.random() * (2500 - 500 + 1)) + 500;
  }

  private getExistingData(key: string): any {
    return localStorage.getItem(key);
  }

  private saveDataInLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
