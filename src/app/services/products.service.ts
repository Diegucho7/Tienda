import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Item, ItemResponse, ItemResponseTotalDto, Product, Productos } from '../model/product.model';




const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  get headers() {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }

  // public productos?: Productos[];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get token(): string {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      return localStorage.getItem('token') || '';
    } else {
      // Handle the case when localStorage is not available
      return '';
    }
  }

  // return localStorage.getItem('token') || '';  }

  getProducts(desde: number = 0): Observable<{ products: Productos[], total: number }> {


    const url = `${base_url}/item/`;
    return this.http.get<{ ok: boolean, products: Productos[], total: number }>


      (url,
        this.headers)

      .pipe(
        map((resp: { ok: boolean, products: Productos[], total: number }) => resp)
      );
  }



  getProductbyId(id: string): Observable<Productos> {


    const url = `${base_url}/productos/${id}`;
    return this.http.get<{ ok: boolean, producto: Productos }>(url,
      this.headers)
      .pipe(
        map((resp: { ok: boolean, producto: Productos }) => resp.producto)

      );


  }


  getItemById(id: string): Observable<Item> {
    const url = `${base_url}/Item/${id}`;
    return this.http.get<ItemResponse>(url, this.headers)
      .pipe(
        map(resp => {
          if (resp.isSuccess) {
            return resp.item;
          } else {
            throw new Error(resp.error);
          }
        })
      );
  }
  getAllItems(): Observable<Item[]> {
    const url = `${base_url}/Item/`;
    return this.http.get<ItemResponseTotalDto>(url).pipe(
      map(resp => {
        if (resp) {
          return resp.item; // devuelve el arreglo de items
        } else {
          // Manejar error, por ejemplo lanzar error o devolver array vacío
          return [];
        }
      })

    );
  }

  createProduct(productos: { idUser: string, name: string, code: string, marca: string, price: number, stock: number, category: string, description: string }) {

    // console.log( productos );
    const url = `${base_url}/productos`;
    return this.http.post<{ ok: boolean, msg: string, producto: Product }>(url, productos, this.headers)
  }
  CreateItem(item: {
    name: string,
    code: string,
    price: number,
    description: string,
    id_brand: number,
    id_productType: number,
    id_state?: number,
    id_countryOrigin?: number })
  {

    // console.log( productos );
    const url = `${base_url}/Item`;
    return this.http.post<{ IsSuccess: boolean, Error: string, Item: Item }>(url, item, this.headers)
  }

  updateProduct(producto: { _id: string, name: string, code: string, marca: string, price: number, stock: number, category: string, description: string, idUser: string, IdProduct: string, quantity: number, stockBefore: number, stockAfter: number }) {

    // console.log(producto)
    const { _id, ...update } = producto
    const url = `${base_url}/productos/${producto.IdProduct}`;
    return this.http.put<{ ok: boolean, msg: string }>(url, update, this.headers)
    // .subscribe(resp =>{ console.log(resp); });

  }
  updateItem(producto: { _id: string, name: string,id_state :number,id_productType:number,id_brand:number,id_countryOrigin:number ,code: string, price: number, stock: number, category: string, description: string, id: number }) {

    // console.log(producto)
    const { _id, ...update } = producto

    const url = `${base_url}/Item/${producto.id}`;
    return this.http.put<{ isSuccess: boolean, mssg: string }>(url, update, this.headers)

  }

  deleteProduct(id: string) {
    const url = `${base_url}/productos/${id}`;
    return this.http.delete<{ ok: boolean, msg: string }>(url, this.headers)


    // .subscribe(resp =>{ console.log(resp); });
  }
  deleteItem(id: string) {
    const url = `${base_url}/item/${id}`;
    return this.http.delete<{ IsSuccess: boolean, Error: string, Item: Item }>(url, this.headers)


    // .subscribe(resp =>{ console.log(resp); });
  }



}
