import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import { Person} from '../../model/product.model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Venta, ArticuloSeleccionado } from '../../../interfaces/orderSalesIterfaces';
import Swal from 'sweetalert2';
import {PersonService} from '../../services/person.service';
import {OrderRequestServices} from '../../services/OrderRequestServices';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {
  public productos: any;
  public Articulos: any;
  searchTerm: string = '';
  public Persons: Person[] = []

  public selectedPerson: Person | null = null;
  articulosForm!: FormGroup;




  constructor(
    private router: Router,
    private productsService: ProductsService,
    // private orderRequestService: OrderRequestServices,
    private personService: PersonService,
    private fb: FormBuilder,
    private orderRequestService: OrderRequestServices
  ) {
  }

  ngOnInit(): void {
    this.articulosForm = this.fb.group({
      items: this.fb.array([])
    });

    // Cargar los artículos y luego inicializar los controles
    this.productsService.getAllItems()
      .subscribe(items => {
        this.Articulos = items.map(item => ({
          ...item,
          quantity: 1,
          stock: item.stock,
          id: item.id,
          name: item.name,
          price: item.price,
          selected: false
        }));
        const formArray = this.articulosForm.get('items') as FormArray;
        this.Articulos.forEach((item: any) => {
          formArray.push(this.fb.group({
            id: [item.id],
            name: [item.name],
            selected: [item.selected],
            stock: [item.stock],
            quantity: [item.quantity, [Validators.min(1)]],
            discount: [item.discount],
            price: [item.price],

          }));
        });
      });
    // Inicializar el formulario con un FormArray vacío
    this.articulosForm = this.fb.group({
      items: this.fb.array([])
    });
    // Cargar las personas
    this.personService.getPersons()
      .subscribe(resp => {
        this.Persons = resp.person;
      });
  }
  get items(): FormArray {
    return this.articulosForm.get('items') as FormArray;
  }

  onSubmit() {
    if (!this.selectedPerson) {
      alert('Debe seleccionar una persona antes de enviar.');
      return;
    }

    const selectedItems: ArticuloSeleccionado[] = this.items.controls
      .filter(control => control.get('selected')?.value)
      .map(control => ({
        id: control.get('id')?.value,
        name: control.get('name')?.value,
        stock: control.get('stock')?.value,
        quantity: control.get('quantity')?.value,
        discount: control.get('discount')?.value,
        price: control.get('price')?.value
      }));
    if (selectedItems.length === 0) {
      alert('Debe seleccionar al menos un artículo.');
      return;
    }
    const venta: Venta = {
      ClienteId: this.selectedPerson.id,
      articulos: selectedItems
    };
    const payload = this.transformarVenta(venta, selectedItems);
    this.orderRequestService.CreateOrder(payload)
      .subscribe((resp: any) => {
        Swal.fire('Orden creada', resp.Mssg, 'success');
        this.router.navigateByUrl(`/user/edit-orderRequest/${resp.item?.id || ''}`);
      }, error => {
        Swal.fire('Error', 'No se pudo crear la orden', 'error');
      });
  }
    filteredPersons(): Person[] {
      if (!this.searchTerm || this.searchTerm.trim() === '') {
        return this.Persons.slice(0, 3);
      }
      const term = this.searchTerm.toLowerCase();
      return this.Persons
        .filter(p =>
          p.numberIdentification.toLowerCase().includes(term) ||
          p.primerNombre.toLowerCase().includes(term)
        )
        .slice(0, 3);
    }
  transformarVenta(venta: Venta, productos: ArticuloSeleccionado[]): any[] {
    return venta.articulos.map(articulo => {
      const producto = productos.find(p => p.id === articulo.id);
      if (!producto) return null;

      const price = producto.price;
      const quantity = articulo.quantity;
      const discount_percent = 0.1; // 10% de descuento fijo (ajusta si necesitas)
      const discount_value = price * quantity * discount_percent;
      const subtotal_before_tax = price * quantity - discount_value;

      const iva = 0.12;
      const igv = 0.18;
      const iva_value = subtotal_before_tax * iva;
      const igv_value = subtotal_before_tax * igv;

      const net_subtotal = subtotal_before_tax;
      const totalIva = iva_value;
      const totalIgv = igv_value;
      const baseTax = subtotal_before_tax;
      const discount = discount_value;
      const grossSubtotal = price * quantity;
      const valueIva = iva_value;
      const valueIgv = igv_value;
      const total = subtotal_before_tax + iva_value + igv_value;

      return {
        item_id: articulo.id,
        item_name: articulo.name,
        total_units: quantity,
        price,
        discount_percent,
        discount_value,
        subtotal_before_tax,
        iva,
        iva_value,
        igv,
        igv_value,
        net_subtotal,
        totalIva,
        totalIgv,
        id_state: 1,          // Valor fijo, ajusta si necesitas otro
        baseTax,
        discount,
        grossSubtotal,
        valueIva,
        valueIgv,
        total,
        id_client: venta.ClienteId
      };
    }).filter(item => item !== null);
  }


  selectPerson(person: Person) {
        this.selectedPerson = person;
      }

}


