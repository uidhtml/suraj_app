import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpUserEvent,
  HttpProgressEvent,
  HttpHeaderResponse,
  HttpSentEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    // Get headers from req
    let newHeaders = req.headers;

    //If Token then set token in header which get from service
    const token = 'anskdjhfkjfhnfsrjhewrfewf';
    if (token) {
      newHeaders = newHeaders.append('token', token);
    }
    const authReq = req.clone({ headers: newHeaders });

    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            //console.log(event);
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('Unauthorize');
            }
          }
        }
      )
    );
  }
}
