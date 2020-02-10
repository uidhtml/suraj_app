import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiHostService {
  public api: string = '/api';

  concatUrl(url: string): string {
    return `${this.api}${url}`;
  }
}