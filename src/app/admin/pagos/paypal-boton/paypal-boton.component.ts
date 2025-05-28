import { Component, ElementRef } from '@angular/core';
// import {  ButtonRenderer} from 'paypal-checkout-components';

@Component({
  selector: 'app-paypal-boton',
  templateUrl: './paypal-boton.component.html',
  styleUrl: './paypal-boton.component.css'
})
export class PaypalBotonComponent {
  constructor(private elementRef: ElementRef) { }

  // ngAfterViewInit() {
  //   const paypalButton = new PayPalButton({
  //     // Configuración de PayPal
  //     createOrder: (data, actions) => {
  //       return actions.order.create({
  //         purchase_units: [{
  //           amount: {
  //             currency_code: 'USD',
  //             value: '10.00'
  //           }
  //         }]
  //       });
  //     },
  //     onApprove: (data, actions) => {
  //       // Procesar la aprobación de la transacción
  //     }
  //   });

  //   paypalButton.render(this.elementRef.nativeElement.querySelector('#paypal-container'));
  // }
}
