import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { EditProdComponent } from './edit-prod/edit-prod.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './edit-prod/products.component';
import { MenuComponent } from './menu/menu.component';
import { PipesModule } from "../pipes/pipes.module";
import { BrowserModule } from '@angular/platform-browser';
import { CategoryComponent } from './category/category.component';
import { CategoriaComponent } from './category/categoria.component';
import { BlogComponent } from './blog/blog.component';
import { BlogIdComponent } from './blog/blog-id.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PagosComponent } from './pagos/pagos.component';
import { PaypalBotonComponent } from './pagos/paypal-boton/paypal-boton.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { ReportsComponent } from './reports/reports.component';
import { SalesComponent } from './sales/sales.component';
import { DiscountComponent } from './sales/discount/discount.component';
import { ReportSalesComponent } from './report-sales/report-sales.component';
import { EditOrderRequestComponent } from './edit-order-request/edit-order-request.component';



@NgModule({
  declarations: [
    AdminComponent,
    EditProdComponent,
    MenuComponent,
    ProductsComponent,
    CategoryComponent,
    CategoriaComponent,
    BlogComponent,
    BlogIdComponent,
    ShoppingCartComponent,
    PagosComponent,
    PaypalBotonComponent,
    ReportsComponent,
    SalesComponent,
    DiscountComponent,
    ReportSalesComponent,
    EditOrderRequestComponent
    
    
  ],
  imports: [
    
    NgxPayPalModule,

    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    PipesModule
],
})
export class AdminModule { }
