import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authservice';
import { reclamation } from '../models/reclamation';
import { reclamationservice } from '../reclamationservice';

@Component({
  selector: 'app-reclamation-admin',
  templateUrl: './reclamation-admin.component.html',
  styleUrls: ['./reclamation-admin.component.css']
})
export class ReclamationAdminComponent {

  constructor(
    private service:reclamationservice,
    private service2:AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) {}
 reclamations:reclamation[]
  ngOnInit() {
    
    this.service.getAllReclamations().subscribe((data: reclamation[])=>{
      this.reclamations=data;
    })
    
  }
  logout(){
    this.service2.logout();
    
  }

}

