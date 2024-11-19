import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CardComponent } from './card/card.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosComponent } from './productos/productos.component';
import { DatabaseModule } from '../../database/database.module';
import { DatosComponent } from '../../database/datos/datos.component';

  

@NgModule({
  declarations: [
    PagesComponent,
    InicioComponent,
    CardComponent,
    ProductosComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    DatabaseModule
    
    
    
  ],
  providers: [
    DatosComponent
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
