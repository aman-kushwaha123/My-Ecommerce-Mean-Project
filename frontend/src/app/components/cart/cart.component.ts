import { Component,inject} from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';
import { cart } from '../../types/cart';
import { FormsModule } from '@angular/forms';
import { AddressService } from '../../services/address.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [FormsModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  customerservice=inject(CustomerService)
  cartService=inject(CartService)
  addressService=inject(AddressService)
  quantity!:any
  Sumquantity!:any
 
  
  ngOnInit(){
    this.cartService.init()
   
    
    
   

  }
   sellingprice(price:any,discount:any){
    return +(Math.round(price-(discount*price)/100))
} 

 

  addincart(productid:any,quantity:Number){
     this.cartService.addtocart(productid,quantity).subscribe((result)=>{
       this.cartService.init()
   })
  }


  removefromcart(productid:any){
    this.cartService.removefromcart(productid).subscribe((result)=>{
       this.cartService.init()
    })
  }

  calculateSum(price:any,quantity:any){

    return +(price*quantity).toFixed(2)
     


  }

  subtotal(){
    
    let cartitems:cart[]=this.cartService.cartProducts
    let total:any=0
    let prevelement:any
    for(let i=0;i<cartitems.length;i++){
      prevelement=total as any
      let element=cartitems[i] as any
      total=prevelement+this.calculateSum(element.product.price,element.quantity)
  }
    return total
  }


  total(){
    this.cartService.total=this.subtotal() as any
    return this.subtotal()
  }

  isProductexist(){
    let cproduct=this.cartService.cartProducts[0]
    if(cproduct){
      return true
    }
    else{
      
      return false
    }
  }
  Message(){
    alert("Please Add Products in Cart")
  }

  
   

 

  

}
