import { Component, ElementRef, ViewChild } from '@angular/core';

interface Carrousel {
  // id: number;
  image: string;
  titulo: string;
  subtitulo: string;
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  

  corrousel : Carrousel[] = [
    {
      image: 'pexels-changerstudio-140831.jpg',
      titulo: 'Innovación',
      subtitulo: 'Estamos en el camino de encontrar nuevas experiencias.',
    },
    {

      image: 'pexels-daria-daria-168502-552535.jpg',
      titulo: 'Calidad',
      subtitulo: 'Comprometidos por completo en entregar el mejor producto.',
    },
    {
      image: 'pexels-nestor-cortez-341956-960540.jpg',
      titulo: 'Sabor',
      subtitulo: 'Por que te mereces lo mejor.',
    }
  ]





}
