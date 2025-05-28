import {Person} from '../app/model/product.model';

// namespace DefaultNamespace;



  export interface ArticuloSeleccionado {
    id: number;
    name: string;
    stock: number;
    quantity: number;
    price: number;
  }

  export interface Venta {
    ClienteId: number;
    articulos: ArticuloSeleccionado[];
  }
export interface DetalleOrden {
  item_id: number;
  item_name: string;
  total_units: number;
  price: number;
  discount_percent: number;
  discount_value: number;
  subtotal_before_tax: number;
  iva: number;
  iva_value: number;
  igv: number;
  igv_value: number;
  net_subtotal: number;
  totalIva: number;
  totalIgv: number;
  id_state: number;
  baseTax: number;
  discount: number;
  grossSubtotal: number;
  valueIva: number;
  valueIgv: number;
  total: number;
  id_client: number;
}

// export interface OrderWithClient {
//   id: number;
//   primerNombre: string;
//   segundoNombre: string;
//   apellidoMaterno: string;
//   apellidoPaterno: string;
//   idPaymentTime: number;
//   baseNoObjectIva: number;
//   baseExemptIva: number;
//   baseIvaZero: number;
//   baseTax: number;
//   descount: number;
//   grossSubtotal: number;
//   valueIva: number;
//   valueIce: number;
//   totalIva: number;
//   totalIgv: number;
//   valueIgv: number;
//   idClient: number;
//   numDocument: string;
//   numberIdentification: string;
// }
export interface PersonSelect {
  id: number;
  primerNombre: string;
  segundoNombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  numberIdentification: string;
}


 export interface OrderWithClient {
  id: number;
  primerNombre: string;
  segundoNombre: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  idPaymentTime: number | null;
  baseNoObjectIva: number;
  baseExemptIva: number | null;
  baseIvaZero: number | null;
  baseTax: number;
  descount: number;
  grossSubtotal: number;
  valueIva: number;
  valueIce: number | null;
  totalIva: number;
  totalIgv: number;
  valueIgv: number;
  idClient: number;
  numDocument: string;
  numberIdentification: string;
}
