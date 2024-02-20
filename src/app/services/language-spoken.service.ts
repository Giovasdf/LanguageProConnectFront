import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageSpokenService {
  private servidor:string=environment.apiUrl;
  private api:string ="LanguageSpoken/";

  private url=this.servidor + this.api;
    //headers
    httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    constructor(private http: HttpClient) { }

    getLanguageSpokens(): Observable<any>
    {
      return this.http.get(this.url);
    }


}
