import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ADMIN_USER_NAME, ADMIN_USER_PASSWORD } from 'src/app/constant';
import { LocalStorageService } from './local-storage.service';
import { User } from 'src/app/modules/user/model/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authKey: string = 'auth';
    users!: User[];
    private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isUserLoggedIn());

    constructor(
        private localStorage: LocalStorageService
    ) { this.getUsers(); }

    isUserLoggedIn(): boolean {
        return localStorage.getItem(this.authKey) !== null;
    }

    get loginStatus$() {
        return this.loggedInSubject.asObservable();
    }

    getCurrentLoginUserRole(): string | null {
        return localStorage.getItem(this.authKey);
    }

    login(data: any) {
        if (!this.users) {
            this.defaultLogin(data);
        } else {
            this.isUseEXist(data);
        }
    }

    logout(): void {
        localStorage.removeItem(this.authKey);
        this.loggedInSubject.next(false);
    }

    private isUseEXist(data: any): void {
        const matchedUser = this.users.find(user => user.userName === data.username && user.password === data.password);
    
        if (matchedUser) {
            console.log("User found. Role is: ", matchedUser.role);
            this.setUserDataInLocalStorage(matchedUser.role);
            this.loggedInSubject.next(true);
        } 
    }
    

    private defaultLogin(data: any) {
        const username = data.username;
        const password = data.password;
        if (username === ADMIN_USER_NAME && password === ADMIN_USER_PASSWORD) {
            this.setUserDataInLocalStorage('admin');
            this.loggedInSubject.next(true);
        }
    }

    private getUsers(): void {
        this.localStorage.getData('users').subscribe((data: any) => {
            this.users = data
        })
    }

    private setUserDataInLocalStorage(role: string): void {
        localStorage.setItem(this.authKey, role)
    }
}
