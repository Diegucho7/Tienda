import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthRoutingModule } from './auth/auth.routing';
import {AdminModule} from './admin/admin.module';
import {AdminRoutingModule} from './admin/admin.routing';

const routes: Routes = [
  { path : '', redirectTo:'/pages', pathMatch:'full'},
  { path: 'pages',
    component:PagesComponent,
    // children: [
    //   { path: 'dashboard', component:DashboardComponent }
    // ]
  },
  {
    path: 'login', component:LoginComponent
  }

  // { path: 'dashboard', component:DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),
    PagesRoutingModule,
    AuthRoutingModule,
    AdminRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
