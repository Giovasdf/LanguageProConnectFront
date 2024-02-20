import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private servidor:string=environment.apiUrl;
  private api:string ="School/";

  private url=this.servidor + this.api;
    //headers
    httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    constructor(private http: HttpClient) { }

    getSchools(): Observable<any>
    {
      return this.http.get(this.url);
    }


}
