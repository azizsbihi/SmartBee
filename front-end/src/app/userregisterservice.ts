import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserToken } from './models/user-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private tokenSubject: BehaviorSubject<UserToken>;
    public token: Observable<UserToken>;
  private apiUrl = 'http://localhost:3000/login';
  

  constructor(
    private http: HttpClient,
    private router:Router
    
  ) {}

  
  register(email?:string,password?:string){
   
  }
  }
