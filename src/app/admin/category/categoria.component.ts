import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { delay } from 'rxjs';
import { Category } from '../../model/category';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {

    public cargando: boolean = true
    public categorySelected: Category[] = [];


  constructor(
                private fb: FormBuilder,
                private router: Router,
                private categoriesService: CategoryService,
                private activateRoute:ActivatedRoute,

  ) { }
  public formCategory!: FormGroup
  ngOnInit(): void {

    this.activateRoute.params
    .subscribe( ({id}) => 
    {this.loadCategoryId(id)});


    this.formCategory = this.fb.group({
      name: ['', Validators.required],
     
    });
  }

  loadCategoryId(id: string) {
    if(id === 'nuevo') {
      this.cargando = false
      return;
    }

    this.categoriesService.getCategory(id).pipe(
      delay(1000)
    )   .subscribe( (categoria:any) => { 
      const { name } = categoria[0]
      
      
      this.categorySelected = categoria[0]
      this.formCategory.setValue( { name: name})
      this.cargando = false
  }, error => {
    return this.router.navigateByUrl(`/user/categories`);
  })
   
  }


  saveCategory(){
      this.categoriesService.createCategory(this.formCategory.value).subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('/user/categories');
      })
  }

}
