import {Component, OnInit} from '@angular/core';
import {OrderRequestServices} from '../../services/OrderRequestServices';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
  generatePDF(order: any) {
    const doc = new jsPDF();

    const fullName = `${order.primerNombre} ${order.segundoNombre} ${order.apellidoPaterno} ${order.apellidoMaterno}`;

    doc.setFontSize(18);
    doc.text('Factura de Orden', 14, 22);

    doc.setFontSize(12);
    doc.text(`N° Documento: ${order.numDocument}`, 14, 32);
    doc.text(`Cliente: ${fullName}`, 14, 40);
    doc.text(`Identificación: ${order.numberIdentification}`, 14, 48);

    autoTable(doc, {
      startY: 60,
      head: [['Base IVA', 'Descuento', 'Subtotal', 'IVA', 'IGV', 'Total']],
      body: [
        [
          order.baseTax?.toFixed(2) ?? '0.00',
          order.descount?.toFixed(2) ?? '0.00',
          order.grossSubtotal?.toFixed(2) ?? '0.00',
          order.totalIva?.toFixed(2) ?? '0.00',
          order.totalIgv?.toFixed(2) ?? '0.00',
          ((order.grossSubtotal || 0) + (order.totalIva || 0) + (order.totalIgv || 0)).toFixed(2)
        ]
      ]
    });

    doc.save(`orden-${order.id}.pdf`);
  }



}
