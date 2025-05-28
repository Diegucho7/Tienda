
import { Injectable } from '@angular/core';
import {Item, Product} from '../model/product.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Venta} from '../../interfaces/orderSalesIterfaces';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class OrderRequestServices {
  get headers() {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }
  constructor( private http: HttpClient,
               private router: Router) { }

  get token(): string {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      return localStorage.getItem('token') || '';
    } else {
      // Handle the case when localStorage is not available
      return '';
    }
  }

  CreateOrder(venta: Venta)
  {

    // console.log( productos );
    const url = `${base_url}/Item`;
    return this.http.post<{ IsSuccess: boolean, Error: string, Item: Item }>(url, venta, this.headers)
  }

}
