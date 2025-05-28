import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ShoppingCart, Total } from '../../model/shoppingCart';
import { Usuario } from '../../model/usuario.model';
import Swal from 'sweetalert2';

import { v4 as uuidv4 } from 'uuid';

import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';

// import {  Button, ButtonRenderer, ButtonsRenderer} from 'paypal-checkout-components';
import { Orden } from '../../model/order.model';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent implements OnInit {


  public payPalConfig ? : IPayPalConfig;
  public showSuccess: boolean = false
  public showCancel: boolean = false
  public showError: boolean = false

  public user: string = '';
    public usuario?: Usuario;
    public apellido?: string = '';
    public email?: string = '';
    public productos: ShoppingCart[] = []


    public descuento: boolean = false
    public total: number[] = [];
    public totalFinal: number = 0
    public totalPagar: Total[] = [];
    public valor?: number;
    public orden?: Orden;

  constructor(
              private activateRoute:ActivatedRoute,
              private shoppingCartService: ShoppingCartService,
              private UsuariosService: UsuariosService,
              private elementRef: ElementRef
  ) {

  }



  ngOnInit(): void {
    this.initConfig();

    this.user =this.UsuariosService.uid
    this.usuario =this.UsuariosService.usuario
    // this.apellido =this.UsuariosService.usuario?.lastname
    // this.email =this.UsuariosService.usuario?.email
    this.activateRoute.params
    .subscribe( ({id}) =>


        this.shoppingCartService.getShoppingCartId(id).subscribe(productos => {

          // console.log(productos);
        this.productos = productos.shoppingCart;

               }));

      this.cargarTotal();

  }

  crearOrden() {
    let factura: string;
    factura = uuidv4();
    // console.log(this.totalPagar);
    this.shoppingCartService.crearOrden(1,this.productos, this.totalPagar, factura, this.user);

  }

  cargarTotal(){
    this.activateRoute.params
    .subscribe( ({id}) =>

        this.shoppingCartService.getShoppingTotalCartId(id).subscribe(total => {
        this.totalPagar = total.orders;
        this.valor = total.total
        // console.log(this.totalPagar);
        }));
  }


  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AVC-4jQgi3zHzFZgIcobH_K502x0AWBVC4Ma0-RwtNQ3HLa-3mfOcRilYtUvUFEzxw_BMY0eFHTGNQUH',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.valor?.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.valor?.toString()
                        }
                    }
                },

                items: this.productos.map((producto)=>{

                  return {
                    name: producto.name,
                    quantity: producto.quantity.toString(),
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: producto.price.toString(),
                    },
                    }
                })
                // [{
                //     name: 'Enterprise Subscription',
                //     quantity: '1',
                //     category: 'DIGITAL_GOODS',
                //     unit_amount: {
                //         currency_code: 'USD',
                //         value: '9.99',
                //     },
                // }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
            this.crearOrden();

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            this.resetStatus();
        }
    };
}

  resetStatus(): void {
      this.showCancel = false;
      this.showError = false;
      this.showSuccess = false;
  }

  pagar(){
    Swal.fire({
      title: 'Estas seguro de pagar?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, pagar!'
    }).then((result) => {
      if (result.isConfirmed) {


        // const buttonRenderer: ButtonRenderer = {
        //   render: (options, selector) => {
        //     // Aquí puedes utilizar los campos del objeto options
        //     console.log(options.env);
        //     console.log(options.style);
        //     console.log(options.locale);
        //     // ...
        //   }
        // };

        // buttonRenderer.render({
        //   env: 'localhost' ,
        //   style: 'paypal',
        //   locale: 'es_ES',
        //   // ...
        // }, '#boton-paypal');

        Swal.fire(
          'Pagado!',
          'Su compra ha sido pagada.',
          'success'
        )
    //     this.shoppingCartService.pagar(this.user).subscribe(resp => {
    //       console.log(resp);
    //       // this.totalFinal = resp.total
    //       console.log(this.totalFinal);
    //       this.descuento = true

    // })
   } })
  }



  // Llamar a la función render

}
