import {Component, OnInit} from '@angular/core';
import {Person} from '../../model/product.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {PersonService} from '../../services/person.service';
import {OrderRequestServices} from '../../services/OrderRequestServices';
import {ArticuloSeleccionado, PersonSelect, Venta} from '../../../interfaces/orderSalesIterfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-order-request',
  templateUrl: './edit-order-request.component.html',
  styleUrl: './edit-order-request.component.css'
})
export class EditOrderRequestComponent implements OnInit {


  public productos: any;
  public Articulos: any;
  searchTerm: string = '';
  public Persons: Person[] = []

  public selectedPerson: PersonSelect | null = null;
  articulosForm!: FormGroup;

  get items(): FormArray {
    return this.articulosForm.get('items') as FormArray;
  }


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

    // Llamada para obtener una orden
    this.orderRequestService.getOrders().subscribe(response => {
      const orden = response[0][0]; // ✅ Porque es [[{...}]]

      // Autollenar cliente
      this.selectedPerson = {
        id: orden.idClient,
        primerNombre: orden.primerNombre,
        segundoNombre: orden.segundoNombre,
        apellidoPaterno: orden.apellidoPaterno,
        apellidoMaterno: orden.apellidoMaterno,
        numberIdentification: orden.numberIdentification
      };

      // Aquí podrías llenar los productos si el backend lo incluye
    });

    // Cargar artículos
    this.productsService.getAllItems().subscribe(items => {
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

    // Cargar personas para búsqueda
    this.personService.getPersons().subscribe(resp => {
      this.Persons = resp.person;
    });
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
        this.router.navigateByUrl(`/user/productPage/${resp.item?.id || ''}`);
      }, error => {
        Swal.fire('Error', 'No se pudo crear la orden', 'error');
      });
    console.log('Venta lista para enviar:', venta);


  }



  transformarVenta(venta: Venta, productos: ArticuloSeleccionado[]): any[] {
    return venta.articulos.map(articulo => {
      const producto = productos.find(p => p.id === articulo.id);
      if (!producto) return null;

      const price = producto.price;
      const quantity = articulo.quantity;
      const discount_percent = 0.1;
      const discount_value = price * quantity * discount_percent;
      const subtotal_before_tax = price * quantity - discount_value;

      const iva = 0.12;
      const igv = 0.18;
      const iva_value = subtotal_before_tax * iva;
      const igv_value = subtotal_before_tax * igv;

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
        net_subtotal: subtotal_before_tax,
        totalIva: iva_value,
        totalIgv: igv_value,
        id_state: 1,
        baseTax: subtotal_before_tax,
        discount: discount_value,
        grossSubtotal: price * quantity,
        valueIva: iva_value,
        valueIgv: igv_value,
        total,
        id_client: venta.ClienteId
      };
    }).filter(item => item !== null);
  }

}
