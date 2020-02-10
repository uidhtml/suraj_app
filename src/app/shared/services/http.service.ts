import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  login(url: string, data: {}) {
    return this.httpClient.post(url, data);
  }

  uploadImage(url: string, data: FormData) {
    return this.postHttp(url, data);
  }
  getHttp(url: string) {
    return this.httpClient.get(url);
  }
  postHttp(url: string, data: FormData) {
    return this.httpClient.post(url, data);
  }
  putHttp(url: string, data: FormData) {
    return this.httpClient.post(url, data);
  }
}