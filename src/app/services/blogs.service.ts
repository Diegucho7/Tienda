import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { response } from 'express';
import { Blog } from '../model/blog.model';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  public uid: string = '';

  constructor(
              private http: HttpClient,
              private router: Router,
              private userService: UsuariosService  
            ) { }


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

                  getBlogId(id: string): Observable<Blog> {

                    const url = `${ environment.base_url }/blogs/${id}`;
                    return this.http.get<Blog>  
                
                    (url, this.headers)
                  
                  }
                  getBlogs(): Observable<Blog[]> {
                
                    const url = `${ environment.base_url }/blogs`;
                    return this.http.get<Blog[]>
                
                    (url, this.headers).pipe(
                      map( (resp:  Blog[]) => resp));
                      
                  }
                  createBlog(blog: Blog){
                    this.uid = this.userService.uid;
                    const blogWithUid = {...blog, userId: this.uid};
                    const url = `${ environment.base_url }/blogs`;
                    return this.http.post<{ok: boolean, msg: string}>(url, blogWithUid, this.headers)
                  }

                  updateBlog(blog:  {_id: string,title: string, description: string}){
                    const { _id, ...update} = blog
                    const url = `${ environment.base_url }/blogs/${blog._id}`;
                    return this.http.put<{ok:boolean,msg:string}>(url, update, this.headers)
                    // .subscribe(resp =>{ console.log(resp); });
                
                  }
                
                  deleteBlog(id:string){
                
                    const url = `${ environment.base_url }/blogs/${id}`;
                    return this.http.delete<{ok: boolean, msg: string}>(url, this.headers)
                
                  }

}
