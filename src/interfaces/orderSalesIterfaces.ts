import {Person} from '../app/model/product.model';

// namespace DefaultNamespace;



  export interface ArticuloSeleccionado {
    id: number;
    name: string;
    stock: number;
    quantity: number;
  }

  export interface Venta {
    cliente: Person;
    articulos: ArticuloSeleccionado[];
  }



