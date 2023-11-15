import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserToken } from './models/user-token';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private tokenSubject: BehaviorSubject<string>;
  public token: Observable<string>;


  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router:Router,
  ) { 
    this.tokenSubject = new BehaviorSubject<string>(localStorage.getItem('jwtToken'));
    this.token = this.tokenSubject.asObservable();
  }

  public get currentTokenValue(): string {
    const token = localStorage.getItem('jwtToken');
    return token ? this.tokenSubject.value : null;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response:any) => {
       
        localStorage.removeItem('jwtToken');
      // Set new token
      localStorage.setItem('jwtToken', response.token);
      localStorage.setItem('userid',response.userid);
      localStorage.setItem('userrole',response.userrole);
      this.tokenSubject.next(response.token);
      if (response.userrole=="user"){
      this.router.navigate(['dashboard']);
      }
      if (response.userrole=="admin" ){
        this.router.navigate(['admin']);
      }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user-token');
    localStorage.removeItem('userid');
    localStorage.removeItem('userrole');
    this.tokenSubject.next(null);
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    const token = this.currentTokenValue;
    return !this.jwtHelper.isTokenExpired(token);
    
  }
  register(email?: string, password?: string){
    return this.http.post<UserToken>(this.apiUrl+"/signup", { email, password });
  }
  getUserRole(): string {
    const user = localStorage.getItem('userrole');
    return user;
  }
}
