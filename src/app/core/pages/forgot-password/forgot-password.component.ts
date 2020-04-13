import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';
import { ROUTE_URLS } from './../../../route-urls-const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public url: string = '/forgot-password.php';
  public pageName: string;
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private apiHostService: ApiHostService,
    private router: Router
  ) {
    this.form = this.fb.group({
      logger: [null],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.router.url.indexOf('admin') === 1
      ? (this.pageName = 'admin')
      : (this.pageName = 'user');
  }

  submit($event): void {
    let formData = new FormData();
    Object.keys(this.form.controls).forEach(key => {
      formData.append(key, this.form.get(key).value);
    });
    this.httpService
      .postHttp(this.apiHostService.concatUrl(this.url), formData)
      .subscribe((response: { success: number; msg: string }) => {
        if (response.success === 1) {
          this.pageName === ROUTE_URLS.USER
            ? this.router.navigate([`/${ROUTE_URLS.USER}/${ROUTE_URLS.LOGIN}`])
            : this.router.navigate([
                `/${ROUTE_URLS.ADMIN}/${ROUTE_URLS.LOGIN}`
              ]);
        } else {
          alert(response.msg);
        }
      });
    $event.preventDefault();
  }
}
