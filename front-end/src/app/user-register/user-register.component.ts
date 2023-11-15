import { Component } from '@angular/core';
import { AuthService } from '../authservice';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
email?:string;
password?:string;
errorMessage: string;

constructor(private authservice:AuthService,private router:Router, private http: HttpClient){};
  onSubmit(): void {
    this.authservice.register(this.email,this.password).subscribe((response:any) => {
      this.router.navigate(['login'])
      
    },
    (error) => {
      this.errorMessage = error.error.message;
    })

      }
}