import { Component, inject } from '@angular/core';
import { ProductcardComponent } from '../productcard/productcard.component';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-wishlists',
  imports: [ProductcardComponent,],
  templateUrl: './wishlists.component.html',
  styleUrl: './wishlists.component.css'
})
export class WishlistsComponent { 
  wishlistService =inject(WishlistService)
  products!:Product[]
  ngOnInit(){
    this.wishlistService.init()
    this.wishlistService.getwishlist().subscribe((result)=>{
      this.products=result
    })
  }

  

}
