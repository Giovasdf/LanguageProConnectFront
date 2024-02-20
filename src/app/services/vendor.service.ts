import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private servidor: string = environment.apiUrl;
  private api: string = "Vendors/";

  private url = this.servidor + this.api;

  // Headers
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  // Método para agregar un nuevo vendor
  addVendor(vendorData: any): Observable<any> {
    return this.http.post<any>(this.url, vendorData, this.httpHeader);
  }

  getAllVendor(): Observable<any>
  {
    return this.http.get(this.url);
  }
}
