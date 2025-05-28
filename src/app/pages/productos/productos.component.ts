import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatosComponent } from '../../../database/datos/datos.component';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {CategoryService} from '../../services/category.service';

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
  public productos: any;
  public Articulos: any;
  constructor(
    private router: Router,
    private productsService: ProductsService,
    private categoryServive: CategoryService
  ){  }
  ngOnInit(): void {




    this.productsService.getAllItems()
      .subscribe(items => {
        this.Articulos = items;

      })


  }


}
