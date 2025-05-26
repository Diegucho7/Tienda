import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Productos } from '../../model/product.model';
import { response } from 'express';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../model/category';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';


@Component({
  selector: 'app-edit-prod',
  templateUrl: './edit-prod.component.html',
  styleUrl: './edit-prod.component.css'
})
export class EditProdComponent implements OnInit {

  public categorias: Category[] = [];
  public productos: any;
  public Articulos: any;
  public productosTemp: Productos[] = [];
  public total: number = 0;
  public desde: number = 0;
  public pag: number = 1;
  public ara: number[] = [];
  constructor(
    private router: Router,
    private productsService: ProductsService,
    private categoryServive: CategoryService
  ) { }
  ngOnInit(): void {


    this.productsService.getAllItems()
      .subscribe(items => {
        this.Articulos = items;

      })



  }

  cambiarPagina2(valor: number) {

    if (valor < 0) {
      this.desde = 0;
    } else if (valor > this.total) {
      valor -= this.pag;
    }
    this.cargarProductos(valor)

  }
  cargarProductos(desde: number) {
    this.productsService.getProducts(desde)
      .subscribe(productos => {
        this.productos = productos.products;

      })
  }
  cambiarPagina(valor: number) {

    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.total) {
      this.desde -= valor;
    }
    this.cargarProductos(this.desde)
  }
  deleteProduct(id: string) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Esta seguro?",
      text: "El producto sera eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteItem(id).subscribe(resp => {
          swalWithBootstrapButtons.fire({
            title: "Eliminado",
            text: "Su producto ha sido eliminado",
            icon: "success"
          }).then(resp => { window.location.reload(); });
        }


          , error => { console.log(error) });


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Su producto no ha sido eliminado",
          icon: "error"
        });
      }
    });




    //  .subscribe(resp =>{


    //     })
  }

}
