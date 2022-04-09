import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PanierComponent } from './panier/panier.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
  { path: 'panier', component: PanierComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/login', component: RestaurantComponent },
  { path: '*', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
