import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../model/blog.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { title } from 'process';
import { UsuariosService } from '../../services/usuarios.service';
import { delay, of } from 'rxjs';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-blog-id',
  templateUrl: './blog-id.component.html',
  styleUrl: './blog-id.component.css'
})
export class BlogIdComponent implements OnInit {

  public imagen: boolean = true
  public imagenSubir: File | null = null;
  public blog?: Blog;
  public BlogSeleccion!: Blog;
  public cargando: boolean = true
  public formBlog!: FormGroup;
  public IdUser: string = '';
  constructor(
    private router: Router,
    private blogService: BlogsService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UsuariosService,
    private fileServices: FileUploadService
  ) { }
  ngOnInit(): void {
    this.loadUserId();


    this.activateRoute.params
      .subscribe(({ id }) => { this.cargarBlog(id) });

    this.formBlog = this.fb.group({
      // category: ['', Validators.required],
      title: ['', Validators.required],
      subject: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
    })

  }

  loadBlogId(id: string) {
    this.blogService.getBlogId(id).subscribe(resp => {
      this.blog = resp
    });
  }

  loadUserId() {
    of(this.userService.uid).subscribe(resp => {
      this.IdUser = resp
    })
  }


  cargarBlog(id: string) {
    if (id === 'nuevo') {
      this.cargando = false
      return;
    }

    this.blogService.getBlogId(id).pipe(
      delay(1000)
    ).subscribe((blog: any) => {
      const { title, description, subject, category } = blog

      this.BlogSeleccion = blog[0]
      this.formBlog.setValue({ category: blog[0].category, title: blog[0].title, description: blog[0].description, subject: blog[0].subject })
      this.cargando = false
    }, error => {
      return this.router.navigateByUrl(`/user/blogs`);
    })

  }
  /**
  
   */
  subirImagen() {

    // const id = this.modalImagenService.id;
    // const tipo = this.modalImagenService.tipo;

    if (this.imagenSubir) {

      this.fileServices
        .actualizarFoto(this.imagenSubir, "blogs", this.BlogSeleccion.IdBlog)
        .then(img => {
          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
          // this.fileServices.nuevaImagen.emit(img);
          // this.cerrarModal();

        }).catch(err => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error')

        })
    }

  }

  onFileChange(file: File) {
    this.imagenSubir = file;


    // if(!file){return;}

    // const reader = new FileReader();
    // // const url64 = reader.readAsDataURL(file);


    // reader.onloadend = () =>{
    //  this.imgTemp = reader.result;
    // }

  }

  saveBlog() {

    if (this.BlogSeleccion) {
      // //Actualizar
      const data = {
        ...this.formBlog.value,
        _id: this.BlogSeleccion.IdBlog
      }
      this.blogService.updateBlog(data)
        .subscribe(resp => {
          Swal.fire('Actualizado el Blog', `El Blog <strong>${data.title}</strong> ha sido actualizado correctamente`, 'success');
          this.imagen = true
        }, (error) => {
          Swal.fire('Error', `Ha ocurrido un error al actualizar el blog: ${error.message}`, 'error');
        })
    } else {

      this.blogService.createBlog(this.formBlog.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado el blog', `El blog <strong>${this.formBlog.value.title}</strong> ha sido creado correctamente`, 'success');
          // this.router.navigateByUrl(`/user/blogs/${resp.blogs.map((p:blog) => p.Idblog)[0]}`);
        }, error => {
          Swal.fire('Error', `Ha ocurrido un error al actualizar el blog`, 'error');
        });

    }




  }
}
