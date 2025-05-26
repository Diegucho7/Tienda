// import { File } from 'buffer';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos,Product  } from '../../model/product.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../model/category';
import { delay } from 'rxjs';
import { error } from 'console';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {


  public uid: string = '';
  public imagenSubir?: File;
  public imgTemp: any = null;
  public id: number | null = null;
  public productos: Productos[] = [];
  public productoSeleccionado!: Productos;
  // public categorias: Category[] = [];
  public formProducts!: FormGroup;
  public imagen: boolean = false;

  public stockBefore: number = 0



  public cargando : boolean = true

  constructor(
                  private router: Router,
                  private productService: ProductsService,
                  private http: HttpClient,
                  private fb: FormBuilder ,
                  private categoriesService: CategoryService,
                  private activateRoute:ActivatedRoute,
                  private fileServices: FileUploadService,
                  private usuarioService: UsuariosService
  ) {

  }


  ngOnInit(): void {

    this.activateRoute.params
    .subscribe( ({id}) =>
    {this.cargarProducto(id)});


    this.productService.getProducts()
    .subscribe(productos =>{
      // this.productos = productos;
    });

    //   this.categoriesService.getCategories()
    // .subscribe(categorias =>{
    //   this.categorias = categorias;
    //
    // });
    this.formProducts = this.fb.group({
      code: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern(/\S+/)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      id_brand: [1],
      id_productType: [1],
      id_state: [1],
      id_countryOrigin: [4]
    });

    // this.cargarProducto('nuevo');
  }

  cargarProducto(id: string) {
    if(id === 'nuevo') {
      this.imagen = false
      this.cargando = false
      return;
    }

    this.productService.getItemById(id).pipe(
      delay(1000)
    )   .subscribe( (producto:any) => {

      this.id = producto.id;
      // const { name, code, price, stock,  description } = producto

      this.imagen = true

      this.productoSeleccionado = producto
      this.formProducts.setValue( { id_brand:1,id_productType:1,id_state:1,id_countryOrigin:1,  name: producto.name, code: producto.code, price: producto.price, stock: producto.stock,  description:  producto.description} )
      this.cargando = false
      this.stockBefore = producto.stock
    }, error => {
      console.log(error);
  })

  }
  subirImagen() {

    // const id = this.modalImagenService.id;
    // const tipo = this.modalImagenService.tipo;

    if (this.imagenSubir){

      this.fileServices
      .actualizarFoto(this.imagenSubir, "productos", this.productoSeleccionado.IdProduct)
      .then( img =>{
        Swal.fire('Guardado', 'Cambios fueron guardados','success');
        // this.fileServices.nuevaImagen.emit(img);
        // this.cerrarModal();

      }).catch (err=>{
        console.log(err);
        Swal.fire('Error', err.error.msg,'error')

      })
    }

  }

  onFileChange(file: File) {
    this.imagenSubir = file;

    }

  guardarProducto() {
    this.uid = this.usuarioService.uid;
    if (this.formProducts.invalid) {
      this.formProducts.markAllAsTouched();
      Swal.fire(
        'Error',
        `Llene bien los campos, el nombre no puede estar vacio,
        el precio debe ser mayor a 0 y el Stock no puede ser negativo`,
        'error'
      );
      return;
    }
    if (this.productoSeleccionado) {
      // //Actualizar
      const data = {
        ...this.formProducts.value,
        _id:this.productoSeleccionado.IdProduct,

      }
      this.productService.updateItem({ ...this.formProducts.value, id: this.id })
        .subscribe({
          next: (resp) => {
            Swal.fire(
              'Producto actualizado',
              `El producto <strong>${this.formProducts.value.name}</strong> ha sido actualizado correctamente.`,
              'success'
            );
            this.imagen = true;
            this.stockBefore = this.formProducts.value.stock;
          },
          error: (error) => {
            const mensajeError = error?.error?.mssg || 'Ha ocurrido un error inesperado';
            Swal.fire('Error', mensajeError, 'error');
          }
        });
    }else{
      // this.uid = this.usuarioService.uid;
      this.productService.CreateItem( {...this.formProducts.value } )
      .subscribe( (resp:any) => {
        // console.log(resp);
        Swal.fire('Creado el Item',`El producto <strong>${this.formProducts.value.name}</strong> ha sido creado correctamente`, 'success');

        // this.router.navigateByUrl(`/user/productPage/${resp.producto.map((p:Product) => p.IdProduct)[0]}`);
        this.router.navigateByUrl(`/user/productPage/${resp.item.id}`);
      },error => {
        Swal.fire('Error', `Ha ocurrido un error al actualizar el producto`, 'error');
      });

    }




  }

}
