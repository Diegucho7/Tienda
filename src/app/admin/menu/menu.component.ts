import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../model/usuario.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

    public idUser?: string = ''

  constructor(
                private usuarioServices: UsuariosService
  ) { }

    ngOnInit(): void {

      this.idUser = this.usuarioServices.usuario?.idUser

    }


}
