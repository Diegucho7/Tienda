import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public myForm: FormGroup
  constructor(
    private route: Router,
    private fb:FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router,
    private ngZone: NgZone
  ){

    this.myForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });


  }

    login() {

    this.usuarioService.login(this.myForm.value).subscribe(
      () => {

        Swal.fire('Success', 'Bienvenido', 'success');
        this.route.navigateByUrl('/user');
      },
      (Error) => {
        const mensaje = Error.value || 'Credenciales inválidas';
        Swal.fire('Error', mensaje, 'error');      }
    );
    }


}
