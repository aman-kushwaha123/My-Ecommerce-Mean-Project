import { Component,inject,Input} from '@angular/core';
import { Product } from '../../types/product';
import {  MatButtonModule, } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-productcard',
  imports: [MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.css'
})
export class ProductcardComponent {
  @Input() product!:any
  wishlistService=inject(WishlistService)
  cartService=inject(CartService)

 
 
  get sellingprice(){
    return Math.round(this.product.price-(this.product.discount*this.product.price)/100)
} 


isInWishlist(product:Product){
  
  let isExits=this.wishlistService.wishlists.find(x=>x._id==product._id);
 
  if(isExits){
    return true
  }
  else{
    return false
  }
}

addtowishlist(product:Product,e:any){
     if(this.isInWishlist(product)){
      e.stopPropagation()
      this.wishlistService.removewishlist(product._id).subscribe((result)=>{
        this.wishlistService.init()
      })

    }else{
      e.stopPropagation()
      this.wishlistService.addwishlist(product._id).subscribe((result)=>{
        this.wishlistService.init()
    })
  }
}


isInCart(product:Product){
  
   const cartproduct=this.cartService.cartProducts.find(x=>x.product._id==product._id)
   if(cartproduct){
    return true;
   }
   else{
    return false;
   }
}

addtocart(product:Product,e:any){
  e.stopPropagation()
  if(this.isInCart(product)){
   
    this.cartService.removefromcart(product._id).subscribe((result)=>{
      this.cartService.init()
    })
    
  }
  else{
   
    this.cartService.addtocart(product._id,1).subscribe((result)=>{
      this.cartService.init()
    })
  }

  
}

}
