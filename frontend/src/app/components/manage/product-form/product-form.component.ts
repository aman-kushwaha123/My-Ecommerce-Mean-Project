import { Component } from '@angular/core';
import { inject,Injectable} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { BrandsService } from '../../../services/brands.service';
import  {Product} from '../../../types/product'
import  {category} from '../../../types/category'
import  {Brand} from '../../../types/brand'
import { FormArray, FormBuilder, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-product-form',
  imports: [FormsModule,MatButtonModule,MatInputModule,ReactiveFormsModule,MatSelectModule,MatCheckboxModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  formBuilder=inject(FormBuilder);
  isfeature:Boolean=false
  isNewprod:Boolean=false
  
  productForm=this.formBuilder.group({
    name:[null,[Validators.required,Validators.minLength(5)]],
    shortdescription:[null,[Validators.required,Validators.minLength(10)]],
    description:[null,[Validators.required,Validators.minLength(50)]],
    price:[null,[Validators.required]],
    discount:[],
    images:this.formBuilder.array([]),//reactive form array and setting with empty arrray
    categoryid:[null,[Validators.required]],
    brandid:[null,[Validators.required]],
    isfeatured:Boolean,
    isNewproduct:Boolean,
    
  })
  
  
router=inject(Router);
route=inject(ActivatedRoute);
productService=inject(ProductService)
isEdit=false
id!:String;

categoryService=inject(CategoryService)
brandService=inject(BrandsService);
categories:category[]=[];
brands:Brand[]=[];
isfeatured:Product[]=[]
isNewproduct:Product[]=[]


  ngOnInit(){
    
     this.categoryService.getCategories().subscribe((result)=>{
      this.categories=result
     })

     this.brandService.getBrands().subscribe((result)=>{
      this.brands=result
     })
     this.id=this.route.snapshot.params['id'];
     console.log(this.id);
     if(this.id){
      this.isEdit=true
      this.productService.getProduct(this.id).subscribe((result)=>{
         console.log(result);
         for(let i=0;i<result.images.length;i++){
          this.addimage()
         }
         this.productForm.patchValue(result as any)
      })

   }
   else{
    this.addimage()
   }
  
     

  }
  addimage(){
    
    this.images.push(this.formBuilder.control(null))

  }

  removeimage(){
    this.images.removeAt(this.images.controls.length-1)
  }
  
  get images(){
    return this.productForm.get('images') as FormArray   //return image control
  }

  add(){
    let value=this.productForm.value as any
    console.log(value)
    this.productService.addProduct(value).subscribe((result)=>{
      alert('Product Added')
      this.router.navigateByUrl('admin/products');
    })

  }

  update(){
    let value=this.productForm.value as any
    this.productService.UpdateProduct(this.id,value).subscribe((result)=>{
      console.log(result);
      alert("Product Updated")
      this.router.navigateByUrl('/admin/products');
    })
  }

  







}
