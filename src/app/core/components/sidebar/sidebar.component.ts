import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() pageName: string;
  public isOpenSidebar: boolean = false;

  public links = [];

  public adminLinks = [
    { title: 'dashboard', icon: 'dashboard', link: 'dashboard' },
    { title: 'all orders', icon: 'shopping_cart', link: 'orders' },
    { title: 'all product', icon: 'category', link: 'products' },
    { title: 'add product', icon: 'add', link: 'products/add' },
  ];
  public userLinks = [
    { title: 'orders', icon: 'history', link: 'orders/latest' },
    { title: 'profile settings', icon: 'settings', link: 'profile' },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.pageName.subscribe((name) => {
      name === 'user'
        ? (this.links = this.userLinks)
        : (this.links = this.adminLinks);
    });
  }

  toggleSidebar() {
    this.isOpenSidebar = !this.isOpenSidebar;
  }
  closeSidebar($event) {
    if ($event.target.tagName === 'A') {
      this.toggleSidebar();
    }
  }
}
