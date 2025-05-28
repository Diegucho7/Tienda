import { CanActivateFn, Router } from '@angular/router';
import {   inject } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuariosService);
  const router = inject(Router);

  if (usuarioService.role === 'ADMIN_ROLE') {
      return true;
  }else{
    router.navigateByUrl('/');
    return false
  }
};


