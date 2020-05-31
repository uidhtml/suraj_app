import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private url: string = '/profile-details.php';
  public id: number = +localStorage.getItem('id');
  public profileDetails = [];
  public isLoaderVisible: boolean = false;

  constructor(
    private location: Location,
    private httpService: HttpService,
    private apiHostService: ApiHostService
  ) {}

  ngOnInit() {
    this.httpService
      .getHttp(this.apiHostService.concatUrl(`${this.url}?id=${this.id}`))
      .subscribe((data: { results: any }) => {
        this.profileDetails = data.results;
      });
  }

  goBack() {
    this.location.back();
  }
}
