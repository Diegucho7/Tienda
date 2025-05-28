import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

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

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  getCategory(id: string): Observable<Category> {

    const url = `${environment.base_url}/categorias/${id}`;
    return this.http.get<Category>

      (url, this.headers)

  }
  getCategories(): Observable<Category[]> {

    const url = `${environment.base_url}/categorias`;
    return this.http.get<Category[]>

      (url, this.headers).pipe(
        map((resp: Category[]) => resp));

  }
  createCategory(category: Category) {

    const url = `${environment.base_url}/categorias`;
    return this.http.post<{ ok: boolean, msg: string }>(url, category, this.headers)
  }

  deleteCategory(id: string) {

    const url = `${environment.base_url}/categorias/${id}`;
    return this.http.delete<{ ok: boolean, msg: string }>(url, this.headers)






  }

}


