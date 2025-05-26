import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  constructor(private usuarioServices:UsuariosService,
  ) {


   }
  ngOnInit(): void {

    
  }

  logOut(){

    this.usuarioServices.logout();
  }
  
}
