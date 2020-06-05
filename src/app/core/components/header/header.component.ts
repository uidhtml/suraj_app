import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  DoCheck,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { ApiHostService } from '@shared/services/api-host.service';
import { HttpService } from '@shared/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, DoCheck {
  @Input() pageName: string;
  @Output() openSidebar = new EventEmitter<boolean>();
  public url: string = '/product-category.php';
  public productIncart: number = 0;
  public cartProductArray = [];
  public mainCategoryLinks: string[] = [];

  public isLoggedIn: boolean = false;
  public loggerData: { firstName: string; image: string } = {
    firstName: 'Guest',
    image: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiHostService: ApiHostService,
    private httpService: HttpService
  ) {
    this.authService.checkLogin();
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.loggerData.firstName = localStorage.getItem('firstName');
      this.loggerData.image = localStorage.getItem('image').trim();
    }
    this.httpService
      .getHttp(this.apiHostService.concatUrl(`${this.url}`))
      .subscribe((data: string[]) => {
        this.mainCategoryLinks = data;
      });

    this.httpService.getAllProducts().subscribe((data) => {
      if (data) {
        let products = [...data];

        let categoryArray = Object.keys(products[0]);
        for (let category of categoryArray) {
          for (let product of products[0][category]) {
            this.cartProductArray.push(product);
          }
        }
      }
    });
  }

  ngDoCheck() {
    this.productIncart = 0;
    this.cartProductArray.map((elem) => {
      if (elem.addedInCart === true) {
        this.productIncart++;
      }
    });
  }

  openSideMenu() {
    this.openSidebar.emit(true);
  }

  gotoCartPage() {
    this.authService.checkLogin();
    !this.authService.isLoggedIn
      ? this.router.navigate([`/${this.pageName}/login`])
      : this.router.navigate([`/${this.pageName}/cart`]);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = this.authService.isLoggedIn;
    if (this.pageName === 'admin') {
      this.router.navigate([`/${this.pageName}/login`]);
    }
  }
}
