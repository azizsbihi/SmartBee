import { state } from '@angular/animations';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/authservice';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
import { user } from '../models/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class UserLoginComponent {
  email?:string;
  password?:string;
  jwtHelper: any;

 
  
  ngOnInit()
  {
  }
  constructor(private authservice:AuthService,private router:Router, private http: HttpClient){};
  onSubmit(): void {
    this.authservice.login(this.email, this.password).subscribe(
      () => {
        console.log('Login successful!');
        
      },
      (error) => {
        console.log('Login failed: ', error);
      }
    );
  }
  
    
      
    
    }
  

 


