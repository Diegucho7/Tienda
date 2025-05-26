import { Component, OnInit } from '@angular/core';
import { Productos } from '../../model/product.model';
import { ProductsService } from '../../services/products.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import {  ShoppingCart, Total } from '../../model/shoppingCart';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  public user: string = ''
  public productos: ShoppingCart[] = []
  public descuento: boolean = false
  public total: number[] = [];    
  public totalFinal: number = 0
  public totalPagar: Total[] = [];
  public valor?: number;
  constructor(
                private productService: ProductsService,
                private UsuariosService: UsuariosService,
                private shoppingCartService: ShoppingCartService,
                private activateRoute:ActivatedRoute
  ) { 

  }

  ngOnInit(): void {

    this.user =this.UsuariosService.uid
    this.activateRoute.params
    .subscribe( ({id}) => 
        
      
        this.shoppingCartService.getShoppingCartId(id).subscribe(productos => {
        this.productos = productos.shoppingCart;
     
               }));

      this.cargarTotal();

      }

      

      cargarTotal(){
        this.activateRoute.params
        .subscribe( ({id}) => 
            
          
            this.shoppingCartService.getShoppingTotalCartId(id).subscribe(total => {
            this.totalPagar = total.orders;
            this.valor = total.total
            // console.log(this.totalPagar);
            }));
      }

  cargarProductos(){
    this.user =this.UsuariosService.uid
    this.shoppingCartService.getShoppingCartId(this.user)
    .subscribe(productos => {
      this.productos = productos.shoppingCart;
      for (let index = 0; index < this.productos.length; index++) {
        const element = this.productos[index];
        this.total[index] = element.quantity * element.price
        this.totalFinal = this.totalFinal + this.total[index]
        // console.log(this.totalFinal);
      }
      
    })
  }

  eliminarProducto(id: string){
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
           this.shoppingCartService.deleteShoppingCart(id).subscribe(resp =>{ swalWithBootstrapButtons.fire({
             title: "Eliminado",
             text: "Su producto ha sido eliminado",
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
             text: "Su producto no ha sido eliminado",
             icon: "error"
           });
         }
       });    
   
  }
  sumaTotal(){
    for (let index = 0; index < this.productos.length; index++) {
      const element = this.productos[index];
      // console.log(element);
    }
  }

  validateQuantity(value: number): number {
    if (value <= 0) {
      return 1; // o puedes devolver un mensaje de error
    }
    return value;
  }
  updateProduct(id:string, cantidad: number) {
    if (cantidad <= 0) {
      cantidad = 1;
    }
    this.shoppingCartService.updateShoppingCart(id, cantidad).subscribe(resp => {
      this.cargarProductos()
      this.cargarTotal()
      Swal.fire('Actualizado', 'La cantidad ha sido actualizada', 'success');
    });
  }


}
