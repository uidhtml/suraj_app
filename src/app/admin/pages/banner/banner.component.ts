import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { Location } from '@angular/common';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '@shared/utility/dialog/info-dialog/info-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_URLS } from '@app/route-urls-const';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  public form: FormGroup;
  public formData: FormData = new FormData();
  public page: { name: string; icon: string };
  public imageFile: File;
  private formGroupDirective: FormGroupDirective;
  @ViewChild('preview', { static: true })
  public preview: ElementRef;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private apiHostService: ApiHostService,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.initForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params.status === 'edit') {
        this.page = { name: 'edit', icon: 'create' };
      } else {
        this.page = { name: 'add', icon: 'add' };
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      image: [null, [Validators.required]],
      addedDate: [new Date(), [Validators.required]],
      status: [0],
    });
    this.getHeroBanner();
  }

  submit() {
    this.formData = this.createFormData(this.form.getRawValue());
    this.formData.append('imageFile', this.imageFile);
    if (this.page.name === 'add') {
      this.addRequest('/add-hero-banner.php');
    } else {
      this.editRequest('/edit-hero-banner.php');
    }
  }
  resetForm() {
    this.formGroupDirective.resetForm();
  }

  getHeroBanner() {
    this.httpService
      .getHttp(this.apiHostService.concatUrl(`/get-hero-banner.php`))
      .subscribe((data: { success: number; results: {}[] }) => {
        this.form.patchValue(data.results[0]);
      });
  }

  addRequest(url: string) {
    this.httpService
      .postHttp(this.apiHostService.concatUrl(url), this.formData)
      .subscribe(
        (data: {
          success: number;
          title: string;
          msg: string;
          error?: {}[];
        }) => {
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
  }

  editRequest(url: string) {
    this.httpService
      .postHttp(this.apiHostService.concatUrl(url), this.formData)
      .subscribe(
        (data: {
          success: number;
          title: string;
          msg: string;
          error?: {}[];
        }) => {
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

  openDialog(success: number, title: string, msg: string, error?: {}[]): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: 'auto',
      data: { success, title, msg, error },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigate([
          `/${ROUTE_URLS.ADMIN}/${ROUTE_URLS.PRODUCTS}/${ROUTE_URLS.ALL}`,
        ]);
      }
    });
  }

  setStats($event) {
    let status = 0;
    if ($event.checked) {
      status = 1;
    }
    this.form.get('status').setValue(status);
  }

  goBack(): void {
    this.location.back();
  }
}
