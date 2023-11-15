import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reclamation } from './models/reclamation';

@Injectable({
  providedIn: 'root'
})
export class HistoriquereclamationService {
  private baseUrl = 'http://localhost:3000/reclamation';

  constructor(private http: HttpClient) { }

  getReclamations(userId: number): Observable<reclamation[]> {
    return this.http.get<reclamation[]>(`${this.baseUrl}/displayreclamations/${userId}`);
  }
}
