import Swal from 'sweetalert2'
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { environment } from '../../../environments/environment';

const base_url = environment.base_url;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  public formSubmitted = false;
  public register: FormGroup
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router
  ) {
    this.register = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/)
        ]
      ],
      password2: ['', Validators.required]
    }, {
      validators: this.passwordsIguales('password', 'password2')
    })
  }

  campoNoValido(campo: string): boolean {
    if (this.register.get(campo)!.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  contrasenasNoValidas(campo: string) {
    const pass1 = this.register.get('password')!.value;
    const pass2 = this.register.get('password2')!.value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true
    } else {
      return false;
    }
  }


  passwordsIguales(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }

    }

  }

  registrar() {
    const { password2, ...userData } = this.register.value;

    this.formSubmitted = true;
    if (this.register.invalid) {
      console.log('algo salio mal')
      return;

      // Extraés los valores del formulario


    } else {
      const formValues = this.register.value;

      // Armás el objeto a enviar
      const userData = {
        username: formValues.username,
        name: formValues.name,
        lastName: formValues.lastname,
        email: formValues.email,
        password: formValues.password,
        fullname: `${formValues.name} ${formValues.lastname}`
      };

      //Realiza el posteo
      this.usuarioService.registerUser(userData)
        .subscribe(resp => {
          Swal.fire('Éxito', resp.msg || 'Registro correcto.', 'success')
            .then(() => {
              this.route.navigateByUrl('/login');
            });
        }, (err) => {

          // Si sucede un error

          Swal.fire('Error', err.error.msg, 'error');

        });

    }
  }

}
