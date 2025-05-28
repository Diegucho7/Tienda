import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {CategoryService} from '../../services/category.service';
import {Person} from '../../model/product.model';
// import {PersonService} from '../../services/person.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Venta, ArticuloSeleccionado } from '../../../interfaces/orderSalesIterfaces';
import Swal from 'sweetalert2';
import {PersonService} from '../../services/person.service';
// import {OrderRequestServices} from '../../services/OrderRequestServices'; // o donde esté definido


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
    private fb: FormBuilder
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

    console.log('Venta lista para enviar:', venta);

  //   this.orderRequestService.CreateOrder( venta )
  //     .subscribe( (resp:any) => {
  //       // console.log(resp);
  //       Swal.fire('Creado el Item',`La venta ha sido creado correctamente`, 'success');
  //
  //   this.router.navigateByUrl(`/user/productPage/${resp.producto.map((p:Product) => p.IdProduct)[0]}`);
  //   this.router.navigateByUrl(`/user/productPage/${resp.item.id}`);
  //   },error => {
  //     Swal.fire('Error', `Ha ocurrido un error al actualizar el producto`, 'error');
  //   });
  //   },
  //
  //
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


  selectPerson(person: Person) {
        this.selectedPerson = person;
      }
    }


