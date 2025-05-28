import Swal from 'sweetalert2'
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrl: './restore-password.component.css'
})
export class RestorePasswordComponent {

  constructor(
    private route: Router,
    private fb:FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router) {
  }



  restorePassword(email:string) {

    this.usuarioService.restorePassword({email})
      .subscribe(resp => {
        Swal.fire('Éxito', resp.msg || 'Correo enviado correctamente.', 'success')
          .then(() => {
            this.route.navigateByUrl('/login');
          });
      }, (err) => {

        // Si sucede un error

        Swal.fire('Error', err.error.msg, 'error');

      });
    ;
  }
}
