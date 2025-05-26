import { Routes, RouterModule, CanActivateFn } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { authGuard } from '../guards/auth.guard';
import { ProductsComponent } from './edit-prod/products.component';
import { EditProdComponent } from './edit-prod/edit-prod.component';
import { MenuComponent } from './menu/menu.component';
import { CategoryComponent } from './category/category.component';
import { CategoriaComponent } from './category/categoria.component';
import { BlogComponent } from './blog/blog.component';
import { BlogIdComponent } from './blog/blog-id.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { adminGuard } from '../guards/admin.guard';
import { PagosComponent } from './pagos/pagos.component';
import {ReportsComponent} from './reports/reports.component';
import {SalesComponent} from './sales/sales.component';




const routes: Routes = [
    { path: 'user',
      component:AdminComponent ,

      canActivate:[authGuard],
      canLoad: [authGuard],
        children: [
          { path: '', component:MenuComponent,canActivate: [adminGuard] },
          { path: 'product', component:EditProdComponent },
          { path: 'reports', component:ReportsComponent },
          { path: 'productPage/:id', component:ProductsComponent },
          { path: 'categories', component: CategoryComponent },
          { path: 'categories/:id', component: CategoriaComponent },
          { path: 'blogs', component: BlogComponent },
          { path: 'sales', component: SalesComponent },
          { path: 'blogs/:id', component: BlogIdComponent },
          { path: 'shoppingcart/:id', component: ShoppingCartComponent },
          { path: 'pagos/:id', component: PagosComponent },
          // { path: 'dashboard', component:DashboardComponent },
        ]
      },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
