import { Component,inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AddressService } from '../../services/address.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-address',
  imports: [FormsModule,ReactiveFormsModule,MatInputModule,MatButtonModule,RouterLink,MatSelectModule,MatRadioButton,CommonModule,MatRadioGroup],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  addressService=inject(AddressService)
  orderService=inject(OrderService)
  cartService=inject(CartService)
  formbuilder=inject(FormBuilder)
  productService=inject(ProductService)
  route=inject(ActivatedRoute)
 
  
  AddressForm=this.formbuilder.group({
    PaymentMode:[null,[Validators.required]],
    Address:[null,[Validators.required,Validators.max(40)]]
    
  })
  

  ngOnInit(){
    
     this.cartService.init()
     this.addressService.init()
     this.productService.init()
  }
  
  addAdd(){
     let textarea=this.AddressForm.value as any
     let value={Address:textarea.Address} as any
     this.addressService.addAddress(value).subscribe((result)=>{
       alert("Address Added")
     })

  }
   checkout(){
    let userData=localStorage.getItem("user") as any
    
    const result=this.addressService.Address.find(x=>x.userId==JSON.parse(userData)._id)  
    if(result){
      return true
    }
    else{
      return false
    }
   
  }

  addorder(){
    let formvalue=this.AddressForm.value as any
    let products=this.productService.Products
    let id=this.route.snapshot.params['id']
    let product=[products.find(x=>x._id==id) as any]
    let order
    if(id){
     order={
      date:new Date(),
      items: product ,
      Address:formvalue.Address,
      paymentmode:formvalue.PaymentMode,
      total: product[0].price
    }
  }else{
    order={
      date:new Date(),
      items:this.cartService.cartProducts,
      Address:formvalue.Address,
      paymentmode:formvalue.PaymentMode,
      total:this.cartService.total
     
    }
  }
    
     this.orderService.addorder(order).subscribe((result)=>{
       alert("Order Added")
       this.cartService.init()

     })
  }

   

}
