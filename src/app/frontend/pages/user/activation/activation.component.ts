import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';
import { ROUTE_URLS } from '@app/route-urls-const';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '@shared/utility/dialog/info-dialog/info-dialog.component';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss'],
})
export class ActivationComponent implements OnInit {
  public disableGetOtp: boolean = false;
  public isOtpValidated: boolean = false;
  public isSmsSendSuccessfully: boolean = false;
  public pageName: string;
  public otpSent: boolean = false;
  public isLoaderVisible: boolean = false;
  public form: FormGroup;
  public validateOtpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private apiHostService: ApiHostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      mobile: ['', [Validators.required]],
    });
    this.validateOtpForm = this.fb.group({
      otp: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.router.url.indexOf('admin') === 1
      ? (this.pageName = 'admin')
      : (this.pageName = 'user');
    this.activatedRoute.params.subscribe((params) => {
      this.otpSent = params.otpSent;
      this.isSmsSendSuccessfully = true;
      const userMobile = localStorage.getItem('haxxixUserMobile');
      this.form.controls.mobile.setValue(userMobile);
    });
  }

  sendOtp($event): void {
    const url: string = '/otp.php';
    this.isLoaderVisible = true;
    let formData = new FormData();
    Object.keys(this.form.controls).forEach((key) => {
      formData.append(key, this.form.get(key).value);
    });
    this.httpService
      .postHttp(this.apiHostService.concatUrl(url), formData)
      .subscribe((response: any) => {
        this.isLoaderVisible = false;

        if (response.success === 1) {
          this.isSmsSendSuccessfully = true;
          localStorage.setItem('haxxixOTP', response.otp);

          this.openDialog(
            response.success,
            'Haxxix says: Successful!!',
            response.msg
          );
        } else {
          this.openDialog(
            response.success,
            'Haxxix says: Error!!',
            response.msg
          );
        }
      });
    $event.preventDefault();
  }

  validateOtp($event): void {
    const url: string = '/user-activate.php';
    if (
      this.validateOtpForm.get('otp').value !==
      localStorage.getItem('haxxixOTP')
    ) {
      this.openDialog(-1, 'Haxxix says: Successful!!', 'OTP mismatch');
    } else {
      this.isLoaderVisible = true;
      let formData = new FormData();
      Object.keys(this.form.controls).forEach((key) => {
        formData.append(key, this.form.get(key).value);
      });
      this.httpService
        .postHttp(this.apiHostService.concatUrl(url), formData)
        .subscribe((response: any) => {
          this.isLoaderVisible = false;

          if (response.success === 1) {
            this.isOtpValidated = true;
            this.openDialog(
              response.success,
              'Haxxix says: Successful!!',
              response.msg
            );
          } else {
            this.openDialog(
              response.success,
              'Haxxix says: Error!!',
              response.msg
            );
          }
        });
    }
    $event.preventDefault();
  }

  openDialog(success: number, title: string, msg: string, error?: {}[]): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: 'auto',
      data: { success, title, msg, error },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true && this.isOtpValidated) {
        this.pageName === ROUTE_URLS.USER
          ? this.router.navigate([`/user/${ROUTE_URLS.LOGIN}`])
          : this.router.navigate([
              `/${ROUTE_URLS.ADMIN}/${ROUTE_URLS.DASHBAORD}`,
            ]);
      }
    });
  }
}
