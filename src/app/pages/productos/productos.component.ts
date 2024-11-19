import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatosComponent } from '../../../database/datos/datos.component';

interface tortas {
    nombre: String,
    descripcion: String
    precio: number,
    imagen: String,
    categoria: "Dulce" | "Sal" | "Light" |"Categoria"

}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})


export class ProductosComponent implements OnInit {
  
  precioRange = 50; // valor inicial

  public productoFiltrado: tortas[] = [];
  public categoriaForm! : FormGroup 
  
  
  constructor(  private fb: FormBuilder,
                public data: DatosComponent
  ){

    this.productoFiltrado = this.data.productos;

    this.categoriaForm = this.fb.group({
      categoria: ['']
    })

  }
  ngOnInit(): void {
    this.productoFiltrado = this.data.productos;

  }
  
    mostrarcategoria (categoria: string){
  
      this.productoFiltrado = this.data.productos.filter((producto) => producto.categoria === categoria);

    }

   

  
}
