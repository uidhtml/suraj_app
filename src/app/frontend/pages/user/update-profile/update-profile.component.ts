import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '@shared/component/form-support/passwordValidator';
import { ROUTE_URLS } from '../../../../route-urls-const';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '@shared/utility/dialog/info-dialog/info-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  private url: string = '/profile-details.php';
  private updateUrl: string = '/profile-update.php';
  private onlyNumberPattern: RegExp = /^[0-9]*$/;
  private passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  public imageFile: File;
  public isLoaderVisible: boolean = false;
  @ViewChild('preview', { static: true })
  public preview: ElementRef;
  public form: FormGroup;
  public formData: FormData = new FormData();
  public id: number = +localStorage.getItem('id');

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private apiHostService: ApiHostService,
    private location: Location,
    public dialog: MatDialog,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        id: [this.id],
        firstName: ['', [Validators.required, Validators.minLength(4)]],
        middleName: [''],
        lastName: ['', [Validators.required]],
        mobile: [
          '',
          [
            Validators.required,
            Validators.pattern(this.onlyNumberPattern),
            Validators.maxLength(10),
            Validators.minLength(10),
          ],
        ],
        email: [''],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(this.passwordPattern),
            Validators.maxLength(15),
            Validators.minLength(8),
          ],
        ],
        confPassword: ['', [Validators.required]],
        addedDate: [new Date(), [Validators.required]],
        image: [''],
        status: ['0'],
      },
      { validator: PasswordValidator }
    );

    this.httpService
      .getHttp(this.apiHostService.concatUrl(`${this.url}?id=${this.id}`))
      .subscribe((data: { results: any }) => {
        this.form.patchValue(data.results[0]);
        this.form.controls.confPassword.setValue(
          this.form.controls.password.value
        );
      });
  }

  submit($event): void {
    this.isLoaderVisible = true;
    this.formData = this.createFormData(this.form.getRawValue());
    if (this.imageFile) {
      this.formData.append('imageFile', this.imageFile);
    }
    this.httpService
      .postHttp(this.apiHostService.concatUrl(this.updateUrl), this.formData)
      .subscribe(
        (data: {
          success: number;
          title: string;
          msg: string;
          error?: {}[];
        }) => {
          this.isLoaderVisible = false;
          if (data.success === 1) {
            this.openDialog(
              data.success,
              'Haxxix says: Successful!!',
              data.msg
            );
          } else {
            this.openDialog(
              data.success,
              'Haxxix says: Error!!',
              data.msg,
              data.error
            );
          }
        }
      );
    $event.preventDefault();
  }

  createFormData(object: {}, form?: FormData, namespace?: string): FormData {
    const formData = form || new FormData();
    for (const property in object) {
      if (!object.hasOwnProperty(property) || !object[property]) {
        continue;
      }
      const formKey = namespace ? `${namespace}[${property}]` : property;
      if (object[property] instanceof Date) {
        formData.append(formKey, object[property].toISOString());
      } else if (
        typeof object[property] === 'object' &&
        !(object[property] instanceof File)
      ) {
        this.createFormData(object[property], formData, formKey);
      } else {
        formData.append(formKey, object[property]);
      }
    }
    return formData;
  }

  getFileInputValue($event, inputName: string) {
    const file = $event.target.files[0];
    const reader = new FileReader();
    let imgURL;
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      imgURL = reader.result;
      this.preview.nativeElement.src = imgURL;
    };
    this.imageFile = file;
    this.form.controls.image.setValue(file.name);
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
  }

  openDialog(success: number, title: string, msg: string, error?: {}[]): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: 'auto',
      data: { success, title, msg, error },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigate([`/${ROUTE_URLS.USER}/${ROUTE_URLS.PROFILE}`]);
      }
    });
  }

  get firstName() {
    return this.form.get('firstName');
  }
  get middleName() {
    return this.form.get('middleName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get mobile() {
    return this.form.get('mobile');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get confPassword() {
    return this.form.get('confPassword');
  }

  goBack(): void {
    this.location.back();
  }
}
