import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '../shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                ]
      }
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
