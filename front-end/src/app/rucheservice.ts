import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cathalogue } from './models/cathalogue';

@Injectable({
  providedIn: 'root'
})
export class rucheservice {
  private apiURL = 'http://localhost:3000';
   

  constructor(private http: HttpClient) {}

  getruches(userid:number): Observable<any> {
    
      return this.http.get<any>(`${this.apiURL}/ruche/displayruches/`+userid);
    }
      
  }
