import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';
import { ROUTE_URLS } from './../../../route-urls-const';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoggerData } from './logger-data.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/utility/dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public url: string = '/login.php';
  public pageName: string;
  public isLoaderVisible: boolean = false;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private apiHostService: ApiHostService,
    private location: Location,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      logger: [null],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.router.url.indexOf('admin') === 1
      ? (this.pageName = 'admin')
      : (this.pageName = 'user');

    this.pageName === 'admin'
      ? this.form.get('logger').setValue('admin')
      : this.form.get('logger').setValue('users');
    //Redirect user to main page according to logger
    localStorage.getItem('username') && this.pageName === 'user'
      ? this.router.navigate([`/${ROUTE_URLS.ROOT}`])
      : this.router.navigate([`/${ROUTE_URLS.ADMIN}/${ROUTE_URLS.DASHBAORD}`]);
  }

  submit($event): void {
    let formData = new FormData();
    Object.keys(this.form.controls).forEach((key) => {
      formData.append(key, this.form.get(key).value);
    });
    this.httpService
      .postHttp(this.apiHostService.concatUrl(this.url), formData)
      .subscribe((response: LoggerData) => {
        this.isLoaderVisible = false;

        if (response.success === 1) {
          for (let data of response.results) {
            Object.keys(data).forEach((key) => {
              localStorage.setItem(key, data[key]);
            });
          }

          this.openDialog(
            response.success,
            'Haxxix says: Successful!!',
            response.msg
          );
        } else {
          this.openDialog(
            response.success,
            'Haxxix says: Error!!',
            response.msg,
            response.status
          );
        }
      });
    $event.preventDefault();
  }

  openDialog(
    success: number,
    title: string,
    msg: string,
    status?: number,
    error?: {}[]
  ): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { success, title, msg, error },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.pageName === ROUTE_URLS.USER
          ? this.router.navigate([`/${ROUTE_URLS.ROOT}`])
          : this.router.navigate([
              `/${ROUTE_URLS.ADMIN}/${ROUTE_URLS.DASHBAORD}`,
            ]);
      } else {
        console.log(status);
        if (status === 0) {
          this.router.navigate([
            `/${ROUTE_URLS.USER}/${ROUTE_URLS.ACTIVATION}`,
          ]);
        }
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
