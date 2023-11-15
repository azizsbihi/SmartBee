import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoriquereclamationComponent } from './historiquereclamation/historiquereclamation.component';
import { AjouterreclamationComponent } from './ajouterreclamation/ajouterreclamation.component';
import { AuthGuard } from './AuthGuard';
import { AdminAuthGuard } from './AdminAuthGuard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReclamationAdminComponent } from './reclamation-admin/reclamation-admin.component';
import { AjouterproduitComponent } from './ajouterproduit/ajouterproduit.component';

import { CreateOrderComponent } from './order/order.component';


const routes: Routes = [
  
    // ...
{path:'admin', component:AdminDashboardComponent, canActivate:[AdminAuthGuard]},
{path:'reclamationadmin', component:ReclamationAdminComponent, canActivate:[AdminAuthGuard]},
{path:'ajouterproduit',component:AjouterproduitComponent,canActivate:[AdminAuthGuard]},

{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
{path:'historique',component:HistoriquereclamationComponent, canActivate: [AuthGuard]},
{path:'ajouterreclamation',component:AjouterreclamationComponent, canActivate: [AuthGuard]},

{path:"login",component:UserLoginComponent},
{path:"register",component:UserRegisterComponent},
{path:"home", component:HomeComponent},

{path:"order", component:CreateOrderComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[UserLoginComponent]