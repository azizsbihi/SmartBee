import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class orderservice {
  private apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getorders(userid:number): Observable<any> {
    
    return this.http.get<any>(`${this.apiURL}/order/displayorders/`+userid);
  }
  getPendingOrdersTotalPrice(userId: number): Observable<number> {
    const status = 'pending';
    return this.http.get<order[]>(`${this.apiURL}/${userId}?status=${status}`).pipe(
      map(orders => orders.reduce((total, order) => total + order.totalprice, 0))
    );
  }

  
}
