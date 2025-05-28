
export interface Productos {
  IdProduct:   string;
  code:        string;
  name:        string;
  marca:       string;
  category:    string;
  price:       string;
  stock:       string;
  description: string;
  image:       string;
}

export interface Product {
  IdProduct:   string;
  code:        string;
  name:        string;
  marca:       string;
  category:    string;
  price:       number;
  stock:       number;
  description: string;
}

export interface Item {
  id: number;
  code: string;
  name: string;
  id_State: number;
  price: number;
  image: string | null;
  description: string;
  id_ProductType: number;
  id_Brand: number;
  id_CountryOrigin: number;
  stock: number;
}

export interface ItemResponse {
  isSuccess: boolean;
  error: string;
  item: Item;
}

export interface Item {
  id: number;
  code: string;
  name: string;
  id_State: number;
  price: number;
  image: string | null;
  description: string;
  id_ProductType: number;
  id_Brand: number;
  id_CountryOrigin: number;
}

export interface ItemResponseTotalDto {
  isSuccess: boolean;
  error: string;
  item: Item[];
}

export interface Person {
  id: number;
  id_typePerson: number;
  id_typeTaxpayer: number;
  id_typeIdentification: number;
  numberIdentification: string;
  fechaCreacion: string;
  fechaInicioOperaciones: string;
  id_estado: number;
  emailTax: string;
  emailGeneral: string;
  id_GroupCompany: number;
  isSupplier: boolean;
  esClient: boolean;
  esEmployed: boolean;
  esAnother: boolean;
  apellidoPaterno: string;
  apellidoMaterno: string;
  primerNombre: string;
  segundoNombre: string;
  id_estadoCivil: number;
  id_genero: number;
  fechaNacimiento: string;
  sufridoEmfermedadGrave: boolean;
  enfermedadGrave: string;
  operado: boolean;
  operadoDe: string;
}

export interface PersonResponse {
  person: Person[];
}
