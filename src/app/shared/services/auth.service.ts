import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_URLS } from '@app/route-urls.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedEmail: string;
  public isLoggedIn: boolean = false;
  constructor(private readonly router: Router) {}

  checkLogin(): boolean {
    this.loggedEmail = localStorage.getItem('email');
    if (!this.loggedEmail) {
      this.isLoggedIn = false;
      this.router.navigate([ROUTE_URLS.ADMIN]);
      return false;
    }
    this.isLoggedIn = true;
    return true;
  }
  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate([ROUTE_URLS.ADMIN]);
  }
}