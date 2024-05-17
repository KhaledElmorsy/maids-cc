import {
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestCacheService } from './request-cache.service';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestCacheInterceptorService implements HttpInterceptor {
  constructor(private requestCache: RequestCacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.requestCache.get(req);

    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.requestCache.set(req, event);
        }
      })
    );
  }
}
