import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import {Route, Router, RouterLink } from '@angular/router';
import { category } from '../../types/category';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSelectTrigger } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {  MatMenuModule } from '@angular/material/menu';
import { AddressService } from '../../services/address.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink,FormsModule,MatIconModule,MatButtonModule,MatMenuModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService=inject(AuthService)
  categoryService=inject(CategoryService)
  searchterm!:String
  event:any
  Address:any
  
  addressSerice=inject(AddressService)
  
  customerService=inject(CustomerService);
   categoryList:category[]=[]
   router=inject(Router);
  
   ngOnInit(){
    this.authService.init()
    this.customerService.getCategories().subscribe((result)=>{
      this.categoryList=result
    })
    this.addressSerice.getAddress().subscribe((result:any)=>{
      this.Address=result[0].Address
    })
   }
  onsearch(e:any){
    
     
      if(e.target.value){
          
           this.router.navigateByUrl("/products?searchterm="+e.target.value)
      }
      
    }
    

  
  searchcategory(id:String){
       this.router.navigateByUrl('products?categoryid='+id);
          

    }

    getname(){
      

    }

   homepage(){
    this.router.navigateByUrl('');
   }


   logout(){
     this.authService.logout()
     this.router.navigateByUrl('/login');
   }
}
 