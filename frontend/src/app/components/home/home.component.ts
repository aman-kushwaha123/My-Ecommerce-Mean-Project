import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { inject } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductcardComponent } from '../productcard/productcard.component';
import { RouterLink } from '@angular/router';

import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-home',
  imports: [CarouselModule,ProductcardComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  customOptions: OwlOptions = {
    
    margin:20,
    loop: true,
    mouseDrag:true,
    touchDrag:false,
    autoplay: true,
    dots: false,
    navSpeed:700,
    nav: true,
    navText: ['‹', '›'],
    
  };
  wishlistService=inject(WishlistService)
  authService=inject(AuthService)
  cartService=inject(CartService)
  bannerImages:Product[]=[]
  featuredProduct:Product[]=[];
  NewProduct:Product[]=[];
  customerService=inject(CustomerService);
  ngOnInit(){
    this.authService.init()
    this.wishlistService.init()
    this.cartService.init()
    this.customerService.getfeaturedproduct().subscribe((result)=>{
      this.featuredProduct=result;
      this.bannerImages.push(...result)
    })
    this.customerService.getNewproduct().subscribe((result)=>{
      this.NewProduct=result;
      this.bannerImages.push(...result)
    })
    

   
  }

}
  