import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';


export const canMatch: CanMatchFn = () => {
  const router = inject(Router);
  return inject(UsuariosService).validarToken()
    .pipe(
      tap( isAuthenticated => {
        if ( !isAuthenticated ) router.navigateByUrl('/login');
      })
    )
}

export const authGuard : CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuariosService);
  const router = inject(Router)

  return usuarioService.validarToken()
  .pipe(
    tap( estaAutenticado => {
      if (!estaAutenticado) {
        router.navigateByUrl('/login');
      }
    })
  );
};
