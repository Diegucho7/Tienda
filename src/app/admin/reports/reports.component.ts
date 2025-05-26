import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  public productos: any;
  public Articulos: any;
  constructor(
    private router: Router,
    private productsService: ProductsService,
    private categoryServive: CategoryService
  ) { }

  ngOnInit(): void {



    this.productsService.getAllItems()
      .subscribe(items => {
        this.Articulos = items;

      })



  }
  get totalGeneral(): number {
    return this.Articulos?.reduce((sum: number, item: any) => sum + (item.stock * item.price), 0) || 0;
  }
  get promedioGeneral(): number {
    if (!this.Articulos || this.Articulos.length === 0) {
      return 0;
    }
    const totalPrecios = this.Articulos.reduce((sum: number, item: any) => sum + item.price, 0);
    return totalPrecios / this.Articulos.length;
  }
}
