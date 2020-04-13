import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedEmail: string;
  public isLoggedIn: boolean = false;
  public isLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoggingObservable = this.isLoginSubject.asObservable();
  public pageName: BehaviorSubject<string> = new BehaviorSubject('user');
  public pageNameObservable = this.pageName.asObservable();

  constructor(private router: Router) {}

  checkLogin(): boolean {
    this.loggedEmail = localStorage.getItem('username');
    if (!this.loggedEmail) {
      this.isLoginSubject.next(false);
      this.setLoggedInData();
      return false;
    }
    this.isLoginSubject.next(true);
    this.setLoggedInData();
    return true;
  }
  logout(): void {
    localStorage.clear();
    this.isLoginSubject.next(false);
    this.setLoggedInData();
  }

  setLoggedInData() {
    this.isLoggingObservable.subscribe(data => {
      this.isLoggedIn = data;
    });
  }
}
