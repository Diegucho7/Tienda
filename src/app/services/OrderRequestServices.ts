
import { Injectable } from '@angular/core';
import {Item, Product} from '../model/product.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DetalleOrden, OrderRequestWithClientDto, OrderWithClient, Venta} from '../../interfaces/orderSalesIterfaces';
import {Observable} from 'rxjs';

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
      return '';
    }
  }


  CreateOrder(payload: DetalleOrden[]) {
    const url = `${base_url}/OrderRequest`;
    return this.http.post<{ IsSuccess: boolean, Mssg: string }>(url, payload, this.headers);
  }
  transformarVenta(venta: Venta, productos: Item[]): any[] {
    return venta.articulos.map(articulo => {
      const producto = productos.find(p => p.id === articulo.id);
      if (!producto) return null;

      const price = producto.price;
      const quantity = articulo.quantity;
      const discount_percent = 0.1;
      const discount_value = price * quantity * discount_percent;
      const subtotal_before_tax = price * quantity - discount_value;

      const iva = 0.12;
      const igv = 0.18;
      const iva_value = subtotal_before_tax * iva;
      const igv_value = subtotal_before_tax * igv;

      const total = subtotal_before_tax + iva_value + igv_value;

      return {
        item_id: articulo.id,
        item_name: articulo.name,
        total_units: quantity,
        price,
        discount_percent,
        discount_value,
        subtotal_before_tax,
        iva,
        iva_value,
        igv,
        igv_value,
        net_subtotal: subtotal_before_tax,
        totalIva: iva_value,
        totalIgv: igv_value,
        id_state: 1,
        baseTax: subtotal_before_tax,
        discount: discount_value,
        grossSubtotal: price * quantity,
        valueIva: iva_value,
        valueIgv: igv_value,
        total,
        id_client: venta.ClienteId
      };
    }).filter(item => item !== null);
  }

  getOrders(): Observable<any> {
    const url = `${base_url}/OrderRequest`;
    return this.http.get<any>(url); // tipo any para aceptar la estructura actual
  }

  getOrderById(id: number): Observable<OrderRequestWithClientDto> {
    return this.http.get<OrderRequestWithClientDto>(`${base_url}/OrderRequest/${id}`);
  }
}
