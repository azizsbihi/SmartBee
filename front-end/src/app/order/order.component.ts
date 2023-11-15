import { Component } from '@angular/core';
import { orderservice } from '../orderservice';
import { order } from '../models/order';
import { AuthService } from '../authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class CreateOrderComponent {
  orders:order[];
  order:order;
  userid:number;
  pendingOrdersTotalPrice:number;
  constructor(private orderservice:orderservice,private service2: AuthService,public router:Router){};
  ngOnInit()
  {
    this.userid=Number(localStorage.getItem('userid'));
    this.orderservice.getorders(this.userid).subscribe((data: order[])=>{
    this.orders=data;
    

  })

  
 

}
logout(){
  this.service2.logout();
}
  
}
