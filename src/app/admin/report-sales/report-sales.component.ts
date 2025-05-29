import {Component, OnInit} from '@angular/core';
import {OrderRequestServices} from '../../services/OrderRequestServices';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {OrderRequestWithClientDto} from '../../../interfaces/orderSalesIterfaces';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrl: './report-sales.component.css'
})
export class ReportSalesComponent implements OnInit {
  orders: any[] = [];
  constructor(private orderService: OrderRequestServices) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(response => {
      this.orders = response[0]; // accedes al primer array interno
    });
  }
  generatePDF(id: number): void {
    this.orderService.getOrderById(id).subscribe({
      next: (order) => {
        if (!order.items || order.items.length === 0) {
          Swal.fire('Error', 'La orden no contiene artículos.', 'warning');
          return;
        }

        const doc = new jsPDF();

        // Título
        doc.setFontSize(18);
        doc.text('Factura de Venta', 14, 20);

        // Datos del cliente
        doc.setFontSize(12);
        doc.text(`Cliente: ${order.primerNombre || ''} ${order.segundoNombre || ''} ${order.apellidoPaterno || ''} ${order.apellidoMaterno || ''}`, 14, 30);
        doc.text(`Identificación: ${order.numberIdentification || ''}`, 14, 37);
        doc.text(`N° Documento: ${order.numDocument || ''}`, 14, 44);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 51);

        // Tabla de productos
        const tableColumn = [
          "Producto",
          "Cantidad",
          "Precio",
          "Descuento",
          "Subtotal",
          "IVA",
          "IGV",
          "Total"
        ];

        const tableRows = order.items.map(item => {
          const totalItem = item.subtotal_before_tax + (item.iva_value || 0) + (item.igv_value || 0);
          return [
            item.item_name,
            item.total_units.toString(),
            `$${item.price.toFixed(2)}`,
            `$${(item.discount_value || 0).toFixed(2)}`,
            `$${item.subtotal_before_tax.toFixed(2)}`,
            `$${(item.iva_value || 0).toFixed(2)}`,
            `$${(item.igv_value || 0).toFixed(2)}`,
            `$${totalItem.toFixed(2)}`
          ];
        });

        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 60,
          theme: 'grid',
          styles: { fontSize: 10 },
          headStyles: { fillColor: [41, 128, 185], textColor: 255 }
        });

        const finalY = (doc as any).lastAutoTable?.finalY || 60;

        // Totales
        doc.setFontSize(12);
        doc.text(`Subtotal con descuento: $${(order.grossSubtotal || 0).toFixed(2)}`, 14, finalY + 10);
        doc.text(`Descuento: $${(order.descount || 0).toFixed(2)}`, 14, finalY + 18);
        doc.text(`IVA: $${(order.totalIva || 0).toFixed(2)}`, 14, finalY + 34);
        doc.text(`IGV: $${(order.totalIgv || 0).toFixed(2)}`, 14, finalY + 42);
        doc.text(`Total con Iva: $${((order.baseTax || 0) + (order.totalIva || 0)).toFixed(2)}`, 14, finalY + 50);
        doc.text(`Total con Igv: $${((order.baseTax || 0) + (order.totalIgv || 0)).toFixed(2)}`, 14, finalY + 58);

        doc.save(`Factura_${order.id}.pdf`);
      },
      error: (err) => {
        console.error('Error al cargar la orden:', err);
        Swal.fire('Error', 'No se pudo cargar la orden', 'error');
      }
    });
  }
  deleteProduct(id: number): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Esta seguro?",
      text: "El producto sera eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deleteOrder(id).subscribe(resp => {
            swalWithBootstrapButtons.fire({
              title: "Eliminado",
              text: "Su producto ha sido eliminado",
              icon: "success"
            }).then(resp => { window.location.reload(); });
          }, error => { console.log(error) });


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Su producto no ha sido eliminado",
          icon: "error"
        });
      }
    });




    //  .subscribe(resp =>{


    //     })
  }

}
