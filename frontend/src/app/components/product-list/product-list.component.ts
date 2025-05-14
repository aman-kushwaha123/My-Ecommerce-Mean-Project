import { Component, inject } from '@angular/core';
import { ProductcardComponent } from '../productcard/productcard.component';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Product } from '../../types/product';
import {MatSelectModule} from '@angular/material/select';
import { category } from '../../types/category';
import { Brand } from '../../types/brand';
import { CategoryService } from '../../services/category.service';
import { BrandsService } from '../../services/brands.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductcardComponent,MatSelectModule,FormsModule,MatButtonModule,NgIf],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
    customerService=inject(CustomerService)
    route=inject(ActivatedRoute)
    
    page=1
    pagesize=6
    searchterm:String=''
    categoryid:String=''
    sortBy:String=''
    sortOrder:number=-1
    brandid:String=''
    products:Product[]=[] 
    categories:category[]=[]
    brands:Brand[]=[]
    empty!:Boolean
    ngOnInit(){
      this.customerService.getCategories().subscribe((result)=>{
        this.categories=result
      })
      this.customerService.getBrands().subscribe((result)=>{
        this.brands=result
      })

     
       this.route.queryParams.subscribe((x:any)=>{
        
        this.searchterm=x.searchterm||'';
        
        this.categoryid=x.categoryid||'';

        this.getproducts()
       })

       setTimeout(() => {
        this.empty=true

        
       },1000);
     
      
      
     
      
    

    }

    getproducts(){
     setTimeout(()=>{
        this.customerService.getproductforlisting(
        this.searchterm,
        this.categoryid,
        this.page,
        this.pagesize,
        this.sortBy,
        this.sortOrder,
        this.brandid
      ).subscribe((result)=>{
        
       this.products=result;
      })

     },500)
    }

    orderBy(event:any){
      this.sortBy='price'
      this.sortOrder=event
     
      this.getproducts()
     

    }

    pagechange(page:number){
      this.page=page
      this.getproducts()
    }


    
}
