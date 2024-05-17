import { Injectable } from '@angular/core';
import type { HttpRequest, HttpResponse } from '@angular/common/http';

interface CacheEntry {
  response: HttpResponse<any>;
  addDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class RequestCacheService {
  private cache = new Map<string, CacheEntry>();
  private MAX_ENTRY_AGE = 180000;

  constructor() {
    /** Clear expired entries every 5 minutes */
    setInterval(() => {
      this.cache.forEach((entry, url) => {
        if (this.checkExpried(entry)) {
          this.cache.delete(url);
        }
      });
    }, 300000);
  }

  private checkExpried(entry: CacheEntry) {
    return entry.addDate.valueOf() + this.MAX_ENTRY_AGE < Date.now();
  }

  get(req: HttpRequest<any>): null | HttpResponse<any> {
    const url = req.urlWithParams;
    const cacheEntry = this.cache.get(url);

    if (!cacheEntry) {
      return null;
    }

    const responseExired = this.checkExpried(cacheEntry);
    if (responseExired) {
      this.cache.delete(url);
      return null;
    }
    return cacheEntry.response;
  }

  set(req: HttpRequest<any>, res: HttpResponse<any>): void {
    const url = req.urlWithParams;
    this.cache.set(url, { addDate: new Date(), response: res });
  }
}
