import { Component } from '@angular/core';

interface tortas {
  nombre: String,
  descripcion: String
  precio: number,
  imagen: String,
  categoria: "Dulce" | "Sal" | "Light" |"Categoria"

}


@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent {
  public productos: tortas[] = [
    {
    nombre: "Tarta de Queso",
    descripcion: "Torta de queso española con muchas cosas más",
    precio: 20,
    imagen:"assets/pexels-changerstudio-140831.jpg",
    categoria: "Dulce"
   
    },
    {
    nombre: "Pai de limón",
    descripcion: "Delicioso Pai de limón, con dulce merengue y el toque de limón justo en equilibrio de sabor",
    precio: 25,
    imagen:"assets/pai-limon.avif",
    categoria: "Sal"
    },
    {
    nombre: "Tarta mousse de chocolate y baileys",
    descripcion: "Delicioso Pai de limón, con dulce merengue y el toque de limón justo en equilibrio de sabor",
    precio: 25,
    imagen:"assets/Mousse-de-chocolate-con-avellanas-y-kisses1.jpg",
    categoria: "Light"

    },
    {
    nombre: "Tarta de fresas con crema de vainilla",
    descripcion: "Delicioso Pai de limón, con dulce merengue y el toque de limón justo en equilibrio de sabor",
    precio: 25,
    imagen:"assets/tarta-fresa.jpg",
    categoria: "Dulce"
    },
    {
    nombre: "Cheesecake de Nutella",
    descripcion: "Delicioso Pai de limón, con dulce merengue y el toque de limón justo en equilibrio de sabor",
    precio: 25,
    imagen:"assets/cheescake-nutella.jpg",
    categoria: "Dulce"
    },
    {
    nombre: "Tarta de hojaldre ",
    descripcion: "Delicioso Pai de limón, con dulce merengue y el toque de limón justo en equilibrio de sabor",
    precio: 25,
    imagen:"assets/tarta-ojaldre.jpg",
    categoria: "Dulce"
    },

  ]

}
