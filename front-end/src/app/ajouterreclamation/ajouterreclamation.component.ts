import { Component } from '@angular/core';
import { reclamation } from '../models/reclamation';
import { reclamationservice } from '../reclamationservice';
import { Router } from '@angular/router';
import { AuthService } from '../authservice';


@Component({
  selector: 'app-ajouterreclamation',
  templateUrl: './ajouterreclamation.component.html',
  styleUrls: ['./ajouterreclamation.component.css']
})
export class AjouterreclamationComponent {
 
  constructor(private service:reclamationservice,private service2:AuthService,public router:Router){};
  reclamation: reclamation = new reclamation();
  userid:number;
  createReclamation():void
    {
      this.userid=Number(localStorage.getItem('userid'));
      this.reclamation.userid=this.userid;
      this.service.createReclamation(this.reclamation).subscribe(
        (data: reclamation) => {
          console.log('Reclamation ajoutée!');
          this.router.navigate(['historique'])
          // do something with the added reclamation
        },
        (error: any) => {
          console.log('Erreur lors de l\'ajout de la réclamation: ', error);
          // handle error
        }
      );
      
      
    }
    logout(){
      this.service2.logout();
    }
    }
     
    
