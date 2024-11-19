import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { InicioComponent } from './inicio/inicio.component';



const routes: Routes = [
    { path: 'pages', component:PagesComponent ,
       
        children: [
          { path: '', component:InicioComponent },
          { path: 'inicio', component:InicioComponent },
          { path: 'productos', component: ProductosComponent },
          { path: 'dashboard', component:DashboardComponent },
        ]
      },

  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule] 
})
export class PagesRoutingModule {}
