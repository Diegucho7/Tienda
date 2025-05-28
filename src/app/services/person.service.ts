import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import {Item, ItemResponse, ItemResponseTotalDto, Person, Product, Productos} from '../model/product.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class PersonService {
  get headers() {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ){}
  get token(): string {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      return localStorage.getItem('token') || '';
    } else {
      // Handle the case when localStorage is not available
      return '';
    }
  }

  getPersons ():Observable<{ person: Person[] }> {


    const url = `${base_url}/Person`;
    return this.http.get<{  person: Person[] }>(url, this.headers)


  }




}
