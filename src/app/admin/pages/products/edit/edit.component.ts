import { Component, OnInit } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { ApiHostService } from '@shared/services/api-host.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public postData: {};

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private apiHostService: ApiHostService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.httpService
        .getHttp(
          this.apiHostService.concatUrl(`/single-product.php?id=${params.id}`)
        )
        .subscribe((data: { success: number; results: {}[] }) => {
          this.postData = data.results[0];
          this.postData['id'] = params.id;
        });
    });
  }
}
