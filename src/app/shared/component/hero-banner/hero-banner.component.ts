import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss'],
})
export class HeroBannerComponent implements OnInit {
  private url: string = '/get-hero-banner.php';
  public hero_banner = [];
  public isLoaderVisible: boolean = false;

  constructor(
    private location: Location,
    private httpService: HttpService,
    private apiHostService: ApiHostService
  ) {}

  ngOnInit() {
    this.httpService
      .getHttp(this.apiHostService.concatUrl(this.url))
      .subscribe((data: { results: any }) => {
        this.hero_banner = data.results;
      });
  }

  goBack() {
    this.location.back();
  }
}
