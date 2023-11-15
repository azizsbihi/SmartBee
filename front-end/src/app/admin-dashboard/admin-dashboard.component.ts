import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../authservice';
import { CathalogueService } from '../cathalogueservice';
import { cathalogue } from '../models/cathalogue';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(
    private service: CathalogueService,
    private service2:AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) {}
  cathalogue:cathalogue[]
  ngOnInit() {
    
    
    this.service.getCathalogue().subscribe((data: cathalogue[]) => {
      this.cathalogue = data;
    
        
      
    });
  }
  logout(){
    this.service2.logout();
    
  }

}
