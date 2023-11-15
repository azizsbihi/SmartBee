import { Component } from '@angular/core';
import { reclamation } from '../models/reclamation';
import { Router } from '@angular/router';
import { reclamationservice } from '../reclamationservice';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-historiquereclamation',
  templateUrl: './historiquereclamation.component.html',
  styleUrls: ['./historiquereclamation.component.css']
})
export class HistoriquereclamationComponent {
  reclamations: reclamation[] = [];
  userid: number;

  constructor(
    private service: reclamationservice,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userid');
    if (userId) {
      this.userid = Number(userId);
      this.service.getReclamations(this.userid).subscribe(
        (data: reclamation[]) => {
          this.reclamations = data;
        },
        error => {
          console.log('Error fetching reclamations:', error);
          // You can add logic to show the error message to the user
          // or log it to a file for troubleshooting.
        }
      );
    } else {
      console.log('User ID is not defined');
    }
  }
  

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  getAllReclamations() {
    this.service.getAllReclamations().subscribe(
      (data: reclamation[]) => {
        this.reclamations = data;
      },
      error => {
        console.log('Error fetching reclamations:', error);
        // You can add logic to show the error message to the user
        // or log it to a file for troubleshooting.
      }
    );
  }
}
