import { Component } from '@angular/core';
import { CathalogueService } from '../cathalogueservice';
import { AuthService } from '../authservice';
import { ActivatedRoute, Router } from '@angular/router';
import { reclamation } from '../models/reclamation';
import { cathalogue } from '../models/cathalogue';

@Component({
  selector: 'app-ajouterproduit',
  templateUrl: './ajouterproduit.component.html',
  styleUrls: ['./ajouterproduit.component.css']
})

export class AjouterproduitComponent {
  constructor(
    private service: CathalogueService,
    private service2:AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) {}
  produit: cathalogue = new cathalogue();
  AjouterProduit():void
  {
    
    this.service.addcathalogue(this.produit).subscribe(
      (data: reclamation) => {
        console.log('cathalogue ajoutée!');
        this.router.navigate(['admin'])
        // do something with the added reclamation
      },
      (error: any) => {
        console.log('Erreur lors de l\'ajout de le produit: ', error);
        // handle error
      }
    );
    
    
  }




  logout(){
    this.service2.logout();
    
  }
  
}
