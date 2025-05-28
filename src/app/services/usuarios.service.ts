import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import {Observable, catchError, delay, map, of, tap, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { PLATFORM_ID, Inject } from '@angular/core';

import { environment } from '../../environments/environment';
import { Usuario } from '../model/usuario.model';
import {LoginForm, responseLogin} from '../../interfaces/login-form.interface';
import { RegisterForm } from '../../interfaces/register.interface';
import Swal from 'sweetalert2';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuario?: Usuario;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,

  ) { }




  get role(): 'ADMIN_ROLE' | 'USER_ROLE' | undefined {

    return this.usuario?.role as 'ADMIN_ROLE' | 'USER_ROLE' | undefined;
  }

  get token():string{
    return localStorage.getItem('token') || '';  }

    get uid():string{

      return this.usuario?.idUser || '';
    }

  guardarLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }


  login(formData: LoginForm) {
    return this.http.post<responseLogin>(`${base_url}/Login`, formData)
      .pipe(
        tap((resp: responseLogin ) => {
          if (!resp.token?.value ) {
            // Lanzamos un error que será capturado en el componente
            throw new Error(resp.Mssg);
          }

            this.guardarLocalStorage(resp.token?.value);

        }),
        catchError((resp) => {
          // Aquí puedes manipular el error antes de pasarlo al componente
          let mensaje = 'Error desconocido';

          if (resp.IsSuccess === false) {
            mensaje = resp.Mssg;
          } else if (resp.error?.mssg) {
            mensaje = resp.error.mssg;
          }

          return throwError(() => new Error(mensaje.toString()));
        })
      );

  }
    logout(){


      localStorage.removeItem('token');



      this.router.navigateByUrl('/pages')

      this.usuario = undefined;
     }

    validarToken(): Observable<boolean> {

      return this.http.get(`${ base_url }/validToken`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      .pipe(
        map((resp:any)=>{

          const  {
            idUser,
            email,
            name,
            lastname,
             role
          } = resp.usuario[0];
          this.usuario = new Usuario(idUser,email,name,lastname,"",role);
          this.guardarLocalStorage(resp.token.value);
          return true;
        }),
        catchError(error => of(false))
      );

    }

    restorePassword(formData: { email: string }) {

    return this.http.post(`${ base_url }/Register/RestorePassword`,formData)
      .pipe(
        tap((resp:any) =>{

          this.guardarLocalStorage(resp);
        }
          )
            )

    }
    changePassword(formData: { Token: string, NewPassword: string }) {
  console.log(formData);
    return this.http.post(`${ base_url }/Register/RestoreChangePassword`,formData)
      .pipe(
        tap((resp:any) =>{

          console.log('restorePassword', resp);
        }
          )
            )
    }

  registerUser(formData: { username: any; lastName: any; email: any; password: any; fullname: string })
      {
      return this.http.post(`${ base_url }/Register`,formData )
      // .pipe(
        // tap((resp:any) =>{
        //
        //   this.guardarLocalStorage(resp.token);
        // }

        // )
      // )

    }


}

