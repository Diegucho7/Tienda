import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuariosService} from '../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {


  public formSubmitted = false;
  public password: FormGroup

  constructor(
    private route: Router,
    private routeParam: ActivatedRoute,
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router
  ) {
    this.password = this.fb.group({

      NewPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/)
        ]
      ],
      NewPassword2: ['', Validators.required]
    }, {
      validators: this.passwordsIguales('NewPassword', 'NewPassword2')
    })
  }



  token: string = '';
  ngOnInit() {
    this.routeParam.params.subscribe(params => {
      this.token = params['token'];
    });
  }
  changePassword() {
    const {NewPassword2, ...userData} = this.password.value;

    this.formSubmitted = true;
    if (this.password.invalid) {
      Swal.fire(
        'Contraseña inválida',
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un carácter especial.',
        'error'
      );
      return;
    }else{
      const payload = {
        ...userData,
        token: this.token
      };
      this.usuarioService.changePassword(payload)
        .subscribe(resp => {
          Swal.fire('Éxito', resp.msg || 'Cambio de clave exitoso.', 'success')
            .then(() => {
              // this.route.navigateByUrl('/login');
            });

        }, (err) => {

          // Si sucede un error

          Swal.fire('Error', err.error.msg, 'error');

        });

    }




  }
  passwordsIguales(pass1Name:string, pass2Name:string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({noEsIgual: true})
      }

    }
  }
}
