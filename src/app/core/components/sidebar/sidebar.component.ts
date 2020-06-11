import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() pageName: string;
  @Input() loggerName: string;
  public isOpenSidebar: boolean = false;

  public links = [];

  public adminLinks = [
    { title: 'dashboard', icon: 'dashboard', link: 'dashboard' },
    { title: 'all product', icon: 'category', link: 'products/' },
    { title: 'add product', icon: 'add', link: 'products/add' },
    {
      title: 'active product',
      icon: 'shopping_cart_active',
      link: 'products/active',
    },
    {
      title: 'inactive product',
      icon: 'remove_shopping_cart',
      link: 'products/inactive',
    },
    { title: 'all orders', icon: 'list_alt', link: 'orders' },
    { title: 'edit banner', icon: 'view_carousel', link: 'banner/edit' },
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
      const firstName = localStorage.getItem('firstName');
      const lastName = localStorage.getItem('lastName');
      this.loggerName = `${firstName} ${lastName}`;
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
