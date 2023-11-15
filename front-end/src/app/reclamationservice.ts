import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reclamation } from './models/reclamation';

@Injectable({
  providedIn: 'root'
})
export class reclamationservice {
  private apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getReclamations(userid: number): Observable<reclamation[]> {
    return this.http.get<reclamation[]>(`${this.apiURL}/reclamation/displayreclamations/${userid}`);
  }

  createReclamation(reclam: reclamation): Observable<reclamation> {
    return this.http.post<reclamation>(`${this.apiURL}/reclamation/add`, reclam);
  }

  getAllReclamations(): Observable<reclamation[]> {
    return this.http.get<reclamation[]>(`${this.apiURL}/reclamation/all`);
  }
}
