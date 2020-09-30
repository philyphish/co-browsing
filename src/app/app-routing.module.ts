import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientComponent } from './components/client/client.component';
import { ObserverComponent } from './components/observer/observer.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent},
  { path: 'client', component: ClientComponent},
  { path: 'observer', component: ObserverComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
