import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './datos/datos.component';



@NgModule({
  declarations: [
    DatosComponent
  ],
  exports:[
    DatosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DatabaseModule { }
