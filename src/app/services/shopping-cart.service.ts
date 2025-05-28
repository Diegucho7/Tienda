import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../model/usuario.model';
import { environment } from '../../environments/environment';
import { ShoppingCartClass,ShoppingCart, Total, Order } from '../model/shoppingCart';
import { Observable } from 'rxjs';
import { Orden, OrdenClass } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public carrito: any[] = [];
  public usuario?: Usuario;
  public productoEncontrado: boolean = false
  public orden: Order[] = [];
  public idCard: string = '';
  public productos: ShoppingCart[] = []

  constructor(
    private http: HttpClient,
    private router: Router,
    private usuarioServices: UsuariosService

  )
  { }

  get token():string{
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      return localStorage.getItem('token') || '';
    } else {
      // Handle the case when localStorage is not available
      return '';
    }
  }

  get headers(){
    return {
      headers: {
      'x-token': this.token
                }
          };
      }

      getShoppingCartId(id: string) {
        const url = `${ environment.base_url }/shoppingcart/${id}`;
        return this.http.get<{ok: boolean, msg: string,shoppingCart: ShoppingCart[]}>(url, this.headers)
      }
      getShoppingTotalCartId(id: string) {
        const url = `${ environment.base_url }/shoppingcart/total/${id}`;
        return this.http.get<{ok: boolean, orders: Total[], total: number}>(url, this.headers)
      }

      addItem(User: string,producto: string){
        
            
            this.createItem(User,producto,1).subscribe(resp => {
              
            })
      

  }

    pagar(id : string){
      const url = `${ environment.base_url }/shoppingcart/pagar/${id}`;
      return this.http.get<{ok: boolean, msg: string}>(url, this.headers)

    }
    createItem(idUser: string, idProduct: string, quantity: number) {
      const url = `${ environment.base_url }/shoppingcart`;
      return this.http.post<{ok: boolean, msg: string,shoppingCart: ShoppingCartClass}>(url,{idUser: idUser,IdProduct: idProduct, quantity: 1  } , this.headers)
    }

  deleteShoppingCart(id: string) {
    const url = `${ environment.base_url }/shoppingcart/${id}`;
    console.log(url)
    return this.http.delete<{ok: boolean, msg: string}>(url)
    // return this.http.delete<{ok: boolean, msg: string}>(url, this.headers)
  }

  updateShoppingCart(id: string, quantity: number) {
    const url = `${ environment.base_url }/shoppingcart/${id}`;
    return this.http.put<{ok: boolean, msg: string}>(url,{quantity: quantity}, this.headers)
  }



  crearOrden(method: number , productos: ShoppingCart[],orden:any, factura: string, usuario: string){
    
    let iva : number = 0
    let subtotal : number = 0
    let total : number = 0
    let desc : number = 0
    let stockBefore : number = 0
    let stockAfter : number = 0

    let totalSubtotales = 0;
    let totalIva = 0;
    let totalTotales = 0;
    let address : string = ''
    let phone : number = 0
    for (let index = 0; index < productos.length; index++) {
      
      const element = productos[index];
      subtotal = element.price*element.quantity;
      subtotal = Number(subtotal.toFixed(2))
      iva = subtotal*0.15
      iva = Number(iva.toFixed(2))
      total = subtotal + iva
      total = Number(total.toFixed(2))
      stockBefore = Number(element.stock)
      stockAfter = stockBefore - element.quantity


      totalSubtotales += subtotal;
      totalIva += iva;
       totalTotales += total;
       
       const url = `${ environment.base_url }/orders`;
       
        this.http.post<{ok: boolean, msg: string, orden: Orden}>(url, {method: method, IdProduct: productos[index].IdProduct, precio: productos[index].price, quantity: productos[index].quantity, factura: factura, idUser: usuario, subtotal: subtotal, iva: iva, total: total, desc: desc, stockBefore: stockBefore, stockAfter: stockAfter, status: 1} , this.headers).subscribe(resp =>{ console.log(resp); });
       // return this.http.post<{ok: 
      }
      return
    // address = usuario.address
    // phone = usuario.phone

    // totalSubtotales = Number(totalSubtotales.toFixed(2))
    // totalIva = Number(totalIva.toFixed(2))
    // totalTotales = Number(totalTotales.toFixed(2))
    // console.log(totalSubtotales, totalIva, totalTotales)
  
    // this.idCard = orden
    // const url = `${ environment.base_url }/orders`;
    // return this.http.post<{ok: boolean, msg: string}>(url,orden , this.headers).subscribe(resp =>{ console.log(resp); });
  }

}
