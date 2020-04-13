import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isHeaderVisible: boolean = false;
  public pageName: string;
  @ViewChild(SidebarComponent, { static: true })
  private sidebar: SidebarComponent;

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.getNavigationEvents();
  }

  getNavigationEvents() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((res: NavigationEnd) => {
        res.url.indexOf('admin') === 1
          ? (this.pageName = 'admin')
          : (this.pageName = 'user');

        res.url.indexOf('login') !== -1 ||
        res.url.indexOf('forgot-password') !== -1
          ? (this.isHeaderVisible = false)
          : (this.isHeaderVisible = true);
        this.authService.pageName.next(this.pageName);
        // console.log(this.router.routerState.root.snapshot.firstChild); // active component
        // console.log(this.router.routerState.root.snapshot.data); // route data
        // console.log(this.router.routerState.root.snapshot.routeConfig); // routes list
      });
  }

  openSidebar($event) {
    this.sidebar.isOpenSidebar = $event;
  }
}
