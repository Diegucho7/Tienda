import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../model/blog.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  public cargando: boolean = true;
  public blogs: Blog[] = [];
  constructor(
      private router: Router,
      private blogService: BlogsService
  ) { }
  ngOnInit(): void {
    
    this.loadBlocs();
    
  }

  loadBlocs(){
    this.blogService.getBlogs().subscribe(resp => 
      this.blogs = resp
    );
    this.cargando = false
  }

  deleteBloc(id: string){const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Esta seguro?",
      text: "El Blog sera eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(id).subscribe(resp =>{ swalWithBootstrapButtons.fire({
          title: "Eliminado",
          text: "Su Blog ha sido eliminado",
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
          text: "Su Blog no ha sido eliminada",
          icon: "error"
        });
      }
    });    


  }


}
