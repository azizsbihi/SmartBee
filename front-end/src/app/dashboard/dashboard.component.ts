import { Component, OnInit } from '@angular/core';
import { ruche } from '../models/ruche';
import { rucheservice } from '../rucheservice';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authservice';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  checkoutUrl: string;
  ruche: ruche[];
  userid: number;
  userrole: string;

  constructor(
    private service: rucheservice,
    private service2:AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    
  ) {}

  async createCheckoutSession() {
    const url = 'http://localhost:3000/order/create-checkout-session';
    const response = await this.http.post<any>(url, {}).toPromise();
    const checkoutUrl = response.url;
    window.location.href = checkoutUrl;
  }
  
  ngOnInit() {
   
    this.userid=Number(localStorage.getItem('userid'));
    console.log('User ID:', this.userid);
      
    this.service.getruches(this.userid).subscribe((data: ruche[]) => {
      this.ruche = data;
    });
  }
  logout(){
    this.service2.logout();
    
  }
}
