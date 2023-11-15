import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { UserLoginComponent } from './user-login/user-login.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule,Routes } from '@angular/router';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoriquereclamationComponent } from './historiquereclamation/historiquereclamation.component';
import { AjouterreclamationComponent } from './ajouterreclamation/ajouterreclamation.component';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './AuthGuard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AjouterproduitComponent } from './ajouterproduit/ajouterproduit.component';
import { ReclamationAdminComponent } from './reclamation-admin/reclamation-admin.component';
import { CreateOrderComponent } from './order/order.component';







@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    UserRegisterComponent,
    DashboardComponent,
    HistoriquereclamationComponent,
    AjouterreclamationComponent,
    AdminDashboardComponent,
    AjouterproduitComponent,
    ReclamationAdminComponent,
    CreateOrderComponent,
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwtToken')
      }
    }),
    FormsModule 


   
  ],
  providers: [
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
