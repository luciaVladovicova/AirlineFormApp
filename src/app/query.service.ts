import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private client: HttpClient) { }
  public get<T>(url: string, options?: any): any {
    return this.client.get<T>(url, options);
  }

  public post(url: string, data: any, options?: any) {
    return this.client.post(url, data, options);
  }

  public put(url: string, data: any, options?: any) {
    return this.client.put(url, data, options);
  }

  public patch(url: string, data: any, options?: any) {
    return this.client.patch(url, data, options);
  }

  public delete(url: string, options?: any) {
    return this.client.delete(url, options);
  }
}

