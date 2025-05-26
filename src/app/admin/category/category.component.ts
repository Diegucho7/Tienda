import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../model/category';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  public cargando: boolean = true
  public categories: Category[] = []
  constructor( 
              private router: Router,
              private categoriesService: CategoryService
  ){

  }
  ngOnInit(): void {
    this.chargeCategories();    
  }

  chargeCategories(){
    this.categoriesService.getCategories()
    .subscribe(categorias => {
      this.categories = categorias
      this.cargando = false
    })
  }

  deleteCategory(id:string){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Esta seguro?",
      text: "La categoria sera eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriesService.deleteCategory(id).subscribe(resp =>{ swalWithBootstrapButtons.fire({
          title: "Eliminado",
          text: "Su categoria ha sido eliminada",
          icon: "success"
        }).then(resp =>{window.location.reload();});
      } 
        
                  
        ,error =>{console.log(error)});

        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Su categoria no ha sido eliminada",
          icon: "error"
        });
      }
    });    


  }
}
