namespace DefaultNamespace;

public interface orderSales
{
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
}
