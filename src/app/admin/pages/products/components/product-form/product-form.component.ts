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
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  public isBodyEmpty: boolean = false;
  public pageTitle: string;
  public page: { name: string; icon: string };
  @Input() postData: any;
  public productId: string = '';
  public formData: FormData = new FormData();
  public imageFile: File;
  @ViewChild(FormGroupDirective, { static: true })
  private formGroupDirective: FormGroupDirective;
  @ViewChild('preview', { static: true })
  public preview: ElementRef;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private apiHostService: ApiHostService,
    public dialog: MatDialog,
    private readonly router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.postData ? (this.productId = this.postData.id) : null;
    this.initForm();
    if (Object.keys(this.postData).length > 0) {
      this.page = { name: 'edit', icon: 'create' };
      this.form.patchValue(this.postData);
    } else {
      this.page = { name: 'add', icon: 'add' };
    }
  }

  initForm() {
    this.form = this.fb.group({
      id: [this.productId],
      name: [null, [Validators.required]],
      category: [null, [Validators.required]],
      mrp: [null, [Validators.required]],
      mrp_unit: [null, [Validators.required]],
      price: [null, [Validators.required]],
      price_unit: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      stock_unit: [null, [Validators.required]],
      gst: [null, [Validators.required]],
      addedDate: [new Date(), [Validators.required]],
      body: [null, [Validators.required]],
      image: [null, [Validators.required]],
      status: ['0'],
    });
  }

  submit() {
    this.formData = this.createFormData(this.form.getRawValue());
    this.formData.append('imageFile', this.imageFile);
    if (this.page.name === 'add') {
      this.addRequest('/add-product.php');
    } else {
      this.editRequest('/edit-product.php');
    }
  }
  resetForm() {
    this.formGroupDirective.resetForm();
  }

  getProductData(id: string) {
    this.httpService
      .getHttp(this.apiHostService.concatUrl(`/single-product.php?id=${id}`))
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
    const bodyString = this.addslashes(
      JSON.stringify(this.form.get('body').value)
    );
    this.formData['body'] = bodyString;

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

  getEditorData(editorData: { time: number; blocks: []; version: string }) {
    if (editorData.blocks.length === 0) {
      this.isBodyEmpty = true;
    } else {
      this.isBodyEmpty = false;
      this.form.controls.body.setValue(editorData);
    }
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

  addslashes(str) {
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/\'/g, "\\'");
    str = str.replace(/\"/g, '\\"');
    str = str.replace(/\0/g, '\\0');
    return str;
  }

  goBack(): void {
    this.location.back();
  }
}
