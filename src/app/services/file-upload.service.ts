import {  Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
// import { Token } from '@angular/compiler';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() {  }





  
  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'productos'|'blogs',
    id: string
  ) {

    try { 

      const url = `${ base_url }/uploads/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });
      
      const data = await resp.json();

      if ( data.ok ) {
        return data.nombreArchivo;
      } else {
        return false;
      }

      
   } catch (error) {
      return false;    
    }

  }

  

}
