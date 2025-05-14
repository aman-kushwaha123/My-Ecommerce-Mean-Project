import { Component,inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductcardComponent } from '../productcard/productcard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-product-detail',
  imports: [ProductcardComponent,MatIconModule,MatButtonModule,RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  customerService=inject(CustomerService)
  cartService=inject(CartService)
  route=inject(ActivatedRoute)
  product:any=null
  id!:String
  mainimage!:String
  brandid!:String
  relatedproducts:Product[]=[]
  wishlistService=inject(WishlistService)
  orderService=inject(OrderService)
  
  ngOnInit(){
    this.cartService.init()

    this.route.params.subscribe((x:any)=>{
      this.getproduct(x.id)
    })
    

   
   
   
  }

  getproduct(id:String){
      this.customerService.getproductById(id).subscribe((result)=>{
      
        this.product=result
        this.mainimage=this.product?.images[0]
        this.brandid=this.product.brandid
        this.relatedproduct(this.brandid)
        
      })
  }
  

  changeimage(url:String){
        this.mainimage=url
  }

  relatedproduct(brandid:String){
    this.customerService.getproductBybrand(brandid).subscribe((result)=>{
      
      this.relatedproducts=result as any
    })

  }
  get sellingprice(){
    return this.product.price-(this.product.discount*this.product.price)/100  
} 

isWishlist(product:Product){
  
  let isExits=this.wishlistService.wishlists.find(x=>x._id==product._id);
  if(isExits){
    return true
  }
  else{
    return false
  }
}

addtowishlist(product:Product,e:any){
  if(this.isWishlist(product)){
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
    console.log(this.isInCart(product))
    this.cartService.addtocart(product._id,1).subscribe((result)=>{
      this.cartService.init()
    })
  }
}



}
